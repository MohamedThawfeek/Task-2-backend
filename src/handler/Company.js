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
  const { id } = req;
  const { company } = req.body;

  const alldata = await Company.findAll({
    where: {
      user_id: id,
    },
  });

  function findRemovedItems(originalArray, updatedArray) {
    const removedItems = [];

    originalArray.forEach((item1) => {
      let found = false;
      updatedArray.forEach((item2) => {
        if (item1.company_id === item2.company_id) {
          found = true;
        }
      });
      if (!found) {
        removedItems.push(item1);
      }
    });

    return removedItems;
  }

  function findNewlyAddedItems(originalArray, updatedArray) {
    const newItems = [];

    updatedArray.forEach((item1) => {
      let found = false;
      originalArray.forEach((item2) => {
        if (item1.company_id === item2.company_id) {
          found = true;
        }
      });
      if (!found) {
        newItems.push(item1);
      }
    });

    return newItems;
  }

  function findCommonItems(originalArray, updatedArray) {
    const commonItems = [];

    originalArray.forEach((item1) => {
      updatedArray.forEach((item2) => {
        if (item1.company_id === item2.company_id) {
          commonItems.push(item1);
        }
      });
    });

    return commonItems;
  }

  const oldCompany = findCommonItems(alldata, company);

  const newCompany = findNewlyAddedItems(alldata, company);

  const removedCompany = findRemovedItems(alldata, company);

  if (removedCompany.length > 0) {
    await Promise.all(
      removedCompany.map(async (i) => {
        await Company.destroy({ where: { company_id: i.company_id } });
      })
    );
  }

  if (oldCompany.length > 0) {
    await Promise.all(
      company.map(async (i) => {
        await Company.update(
          {
            name: i.name,
            address: i.address,
            gstnumber: i.gstnumber,
            phonenumber: i.phonenumber,
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
          name: i.name,
          address: i.address,
          gstnumber: i.gstnumber,
          phonenumber: i.phonenumber,
          user_id: id,
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
    attributes: [
      "company_id",
      "user_id",
      "name",
      "address",
      "phonenumber",
      "gstnumber",
      "createdAt",
    ],
    include: [
      {
        model: Employee,
        as: "employees",
        attributes: [
          "company_id",
          "employee_id",
          "name",
          "address",
          "phonenumber",
          "age",
          "gender",
          "salary",
          "role",
        ],
      },
      {
        model: Product,
        as: "products",
        attributes: [
          "company_id",
          "product_id",
          "name",
          "category",
          "price",
          "quantity",
          "description",
          "image",
        ],
      },
    ],
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
