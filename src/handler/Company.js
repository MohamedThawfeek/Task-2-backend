const Company = require("../model/Company");
const Employee = require("../model/Employee");
const Product = require("../model/Product");
const User = require("../model/User");


exports.updateSingleCompany = async (req) => {
  const { company_id, Name, Address, PhoneNumber, Gst } = req.body;

  const findCompany = await Company.findOne({
    where: {
      company_id: company_id,
    },
  });
  
  if (!findCompany) {
    return {
      success: false,
      message: "Company not found",
    };
  }

  await Company.update(
    {
      name: Name,
      address: Address,
      gstnumber: Gst,
      phonenumber: PhoneNumber,
    },
    { where: { company_id: company_id } }
  );

  return {
    success: true,
    message: "Company updated successfully",
  };
};
exports.updateCompany = async (req) => {
  const { company } = req.body;

  const alldata = await Company.findAll({});

  const oldCompany = company.filter((comp) => {
    return alldata.some((data) => data.company_id === comp.company_id);
  });
  const newCompany = company.filter((comp) => {
    return !alldata.some((data) => data.company_id === comp.company_id);
  });

  if (oldCompany.length > 0) {
    await Promise.all(
      oldCompany.map(async (i) => {
        await Company.update(
          {
            name: i.Name,
            address: i.Address,
            gstnumber: i.GstNumber,
            phonenumber: i.PhoneNumber,
          },
          { where: { company_id: i.company_id } }
        );
      })
    );
  }

  if (newCompany.length > 0) {
    await Promise.all(
      newCompany.map(async (i) => {
        await Company.create({
          name: i.Name,
          address: i.Address,
          gstnumber: i.GstNumber,
          phonenumber: i.PhoneNumber,
          user_id: i.user_id,
        });
      })
    );
  }

  return {
    success: true,
    message: "Company updated successfully",
  };
};

exports.deletCompany = async (req) => {
  const { company_id } = req.body;
  const findCompany = await Company.findOne({
    where: {
      company_id,
    },
  });

  if (!findCompany) {
    return {
      success: false,
      message: "Company not found",
    };
  }

  await Company.destroy({
    where: {
      company_id: company_id,
    },
  });

  return {
    success: true,
    message: "Company deleted successfully",
  };
};

exports.getAllCompany = async (req) => {
  const { id } = req;
  const findAllCompany = await Company.findAll({
    where: {
      user_id: id,
    },
    attributes: ['company_id', 'user_id', 'name', 'address', 'phonenumber', 'gstnumber', 'createdAt'],
    include: [{
      model: Employee,
      as: 'employees',
      attributes: ['company_id', 'employee_id', 'name', 'address', 'phonenumber', 'age', 'gender', 'salary', 'role']
    },
  {
    model: Product,
    as: 'products',
    attributes: ['company_id', 'product_id', 'name', 'category', 'price', 'quantity', 'description', 'image']
  }]
  });
  return {
    success: true,
    message: "Company found successfully",
    data: findAllCompany,
  };
};

exports.createCompany = async (req) => {
  const { id } = req;
  const { Name, Address, PhoneNumber, Gst } = req.body;
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

  await Company.create({
    user_id: id,
    name: Name,
    address: Address,
    phonenumber: PhoneNumber,
    gstnumber: Gst,
  });

  return {
    success: true,
    message: "Company Created successfully",
  };
};
