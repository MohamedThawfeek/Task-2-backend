const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../model/User");
const UserOPT = require("../model/UserOTP");
const { generateOTP } = require("../utils/GenerateOTP");
const { signUpOtp } = require("../email");
const UserDetails = require("../model/UserDetails");
const Company = require("../model/Company");
const Employee = require("../model/Employee");
const Product = require("../model/Product");

require("dotenv").config({});

exports.createUser = async (req) => {
  const { firstName, lastName, email, phoneNumber, password } = req.body;

  const generateotp = await generateOTP();
  const getMail = await User.findOne({
    where: {
      email: email,
    },
  });

  if (getMail) {
    return {
      success: false,
      message: "Email already exists",
    };
  }
  const getNumber = await User.findOne({
    where: {
      phonenumber: phoneNumber,
    },
  });

  if (getNumber) {
    return {
      success: false,
      message: "Phone number already exists",
    };
  }

  const hash = await bcrypt.hash(password, Number(process.env.SALT));

  const userData = await User.create({
    firstname: firstName,
    lastname: lastName,
    email: email,
    phonenumber: phoneNumber,
    password: hash,
  });

  await UserOPT.create({
    user_id: userData?.user_id,
    otp: generateotp,
    status: "Verify",
  });

  const token = jwt.sign(
    {
      id: userData?.user_id,
    },
    process.env.SECRET_KEY,
    { expiresIn: "1d" }
  );

  await signUpOtp({
    mail: email,
    name: `${firstName} ${lastName}`,
    token: token,
    otp: generateotp,
  });

  return {
    success: true,
    message: "Account created successfully",
  };
};

exports.signIn = async (req) => {
  const { email, password } = req.body;
  const user = await User.findOne({
    where: {
      email: email,
    },
  });

  if (!user) {
    return {
      success: false,
      message: "Email does not exist",
    };
  }
  const match = await bcrypt.compare(password, user.password);

  if (match) {
    if (!user.verify) {
      return {
        success: false,
        message: "Account not verified",
      };
    }

    const token = jwt.sign(
      {
        id: user.user_id,
      },
      process.env.SECRET_KEY,
      { expiresIn: "1d" }
    );

    return { success: true, message: "Get login token", token };
  } else {
    return { success: false, message: "Wrong Password" };
  }
};

exports.userDetails = async (id) => {
  const user = await User.findOne({
    where: {
      user_id: id,
    },
    attributes: [
      "user_id",
      "firstname",
      "lastname",
      "email",
      "phonenumber",
      "createdAt",
    ],
    include: [
      {
        model: UserDetails,
        as: "users_detail",
        attributes: ["dob", "gender", "qualification"],
      },
      {
        model: Company,
        as: "companies",
        attributes: [
          "company_id",
          "name",
          "address",
          "phonenumber",
          "gstnumber",
        ],
        include: [
          {
            model: Employee,
          },
          {
            model: Product,
          },
        ],
      },
    ],
  });
  if (!user) {
    return {
      success: false,
      message: "User does not exist",
    };
  }

  return {
    success: true,
    message: "User details",
    data: user,
  };
};

exports.userDetailsUpdate = async (req) => {
  const { id } = req;
  const { firstName, lastName, phoneNumber } = req.body;
  const user = await User.findOne({
    where: {
      user_id: id,
    },
    attributes: [
      "user_id",
      "firstname",
      "lastname",
      "email",
      "phonenumber",
      "createdAt",
    ],
  });
  if (!user) {
    return {
      success: false,
      message: "User does not exist",
    };
  }

  const allUser = await User.findAll({
    where: {
      phonenumber: phoneNumber,
    },
  });

  if (allUser.length > 1) {
    if (id !== allUser[0].user_id) {
      return {
        success: false,
        message: "Phone number already exists",
      };
    }
  }

  await User.update(
    { firstname: firstName, lastname: lastName, phonenumber: phoneNumber },
    {
      where: {
        user_id: id,
      },
    }
  );

  return {
    success: true,
    message: "User details updated successfully",
  };
};

exports.deleteUser = async (id) => {
  const user = await User.findOne({
    where: {
      user_id: id,
    },
  });

  if (!user) {
    return {
      success: false,
      message: "User does not exist",
    };
  }

  await User.destroy({
    where: {
      user_id: id,
    },
  });

  return {
    success: true,
    message: "User deleted successfully",
  };
};

exports.verifyUser = async (req) => {
  const { id } = req;
  const { otp, status } = req.body;
  const findOtp = await UserOPT.findOne({
    where: {
      user_id: id,
      otp: otp,
      status: status,
    },
  });
  if (!findOtp) {
    return {
      success: false,
      message: "Invalid OTP",
    };
  }
  const user = await User.findOne({
    where: {
      user_id: id,
    },
  });

  if (!user) {
    return {
      success: false,
      message: "User does not exist",
    };
  }

  await User.update(
    { verify: true },
    {
      where: {
        user_id: id,
      },
    }
  );

  await UserOPT.destroy({ where: { id: findOtp.id } });

  const token = jwt.sign(
    {
      id: user.user_id,
    },
    process.env.SECRET_KEY,
    { expiresIn: "1d" }
  );

  return {
    success: true,
    message: "User verified successfully",
    token,
  };
};

exports.listCompany = async (req) => {
  const { id } = req;
  const user = await UserDetails.findOne({
    where: {
      user_id: id,
    },
  });
  if (!user) {
    return {
      success: false,
      message: "User does not exist",
    };
  }

  return {
    success: true,
    message: "User details",
    data: user.company_details,
  };
};

exports.resend = async (req) => {
  const { email, status } = req.body;

  const generateotp = await generateOTP();

  const user = await User.findOne({
    where: {
      email: email,
    },
  });

  const token = jwt.sign(
    {
      id: user?.user_id,
    },
    process.env.SECRET_KEY,
    { expiresIn: "1d" }
  );

  await signUpOtp({
    mail: email,
    name: `${user?.firstname} ${user?.lastname}`,
    token: token,
    otp: generateotp,
  });

  if (!user) {
    return {
      success: false,
      message: "User does not exist",
    };
  }

  await UserOPT.destroy({ where: { user_id: user?.user_id, status: status } });

  await UserOPT.create({
    user_id: user?.user_id,
    otp: generateotp,
    status: status,
  });

  return {
    success: true,
    message: "OTP send successfully",
  };
};
