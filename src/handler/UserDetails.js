const Company = require("../model/Company");
const User = require("../model/User");
const UserDetails = require("../model/UserDetails");
const { v4: uuid } = require("uuid");

exports.addDetails = async (req) => {
  const { id } = req;

  const { dob, gender, qualification, company } = req.body;
  const user = await User.findOne({
    where: {
      user_id: id,
    },
  });
  if (!user) {
    return {
      success: false,
      message: "User not found",
    };
  }
  await UserDetails.create({
    user_id: id,
    dob,
    gender,
    qualification,
    company_details: company,
  });

  await company.map(
    async (i) =>
      await Company.create({
        user_id: id,
        name: i.Name,
        address: i.Address,
        phonenumber: i.PhoneNumber,
        gstnumber: i.Gst,
      })
  );

  return {
    success: true,
    message: "Details added successfully",
  };
};

exports.updateDetails = async (req, res) => {
  const { id } = req;
  const { dob, gender, qualification } = req.body;
  const user = await User.findOne({
    where: {
      user_id: id,
    },
  });
  if (!user) {
    return {
      success: false,
      message: "User not found",
    };
  }
  await UserDetails.update(
    {
      dob,
      gender,
      qualification,
      user_id: id,
    },
    { where: { user_id: id } }
  );

  

  return {
    success: true,
    message: "Details updated successfully",
  };
};

exports.getDetails = async (req, res) => {
  const { id } = req;
  const user = await UserDetails.findOne({
    where: {
      user_id: id,
    },
  });
  if (!user) {
    return {
      success: false,
      message: "User not found",
    };
  }

  return {
    success: true,
    message: "Details updated successfully",
    data: user,
  };
};

exports.createCompany = async (req) => {
  const { id } = req;
  const { Name, Address, PhoneNumber, Gst } = req.body;
  const user = await UserDetails.findOne({
    where: {
      user_id: id,
    },
  });
  if (!user) {
    return {
      success: false,
      message: "User not found",
    };
  }
  const getCompanyDetails = await user?.company_details;

  const datas = [
    ...getCompanyDetails,
    {
      id: uuid(),
      Name,
      Address,
      PhoneNumber,
      Gst,
    },
  ];

  await UserDetails.update(
    {
      company_details: datas,
    },
    { where: { user_id: id } }
  );

  return {
    success: true,
    message: "Company added successfully",
  };
};

exports.editCompany = async (req) => {
  const { id } = req;
  const { company_id, Name, Address, PhoneNumber, Gst } = req.body;
  const user = await UserDetails.findOne({
    where: {
      user_id: id,
    },
  });
  if (!user) {
    return {
      success: false,
      message: "User not found",
    };
  }
  const notEdit = await user?.company_details.filter(
    (i) => i.id !== company_id
  );

  const getCompanyDetails = await user?.company_details.filter(
    (i) => i.id === company_id
  )[0];

  const datas = [
    ...notEdit,
    {
      id: getCompanyDetails.id,
      Name,
      Address,
      PhoneNumber,
      Gst,
    },
  ];

  await UserDetails.update(
    {
      company_details: datas,
    },
    { where: { user_id: id } }
  );

  return {
    success: true,
    message: "Company added successfully",
  };
};

exports.deleteCompany = async (req) => {
  const { id } = req;
  const { company_id } = req.body;
  const user = await UserDetails.findOne({
    where: {
      user_id: id,
    },
  });
  if (!user) {
    return {
      success: false,
      message: "User not found",
    };
  }
  const notEdit = await user?.company_details.filter(
    (i) => i.id !== company_id
  );

  await UserDetails.update(
    {
      company_details: notEdit,
    },
    { where: { user_id: id } }
  );

  return {
    success: true,
    message: "Company removed successfully",
  };
};
