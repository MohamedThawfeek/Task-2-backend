const Company = require("../model/Company");
const Employee = require("../model/Employee");


exports.createEmployee = async (req) => {
    const { company_id, name, address, phoneNumber, age, gender, salary, role } = req.body;

    const findUser = await Company.findOne({
        where: {
            company_id
        }
    })

    if (!findUser) {
        return {
            success: false,
            message: "Company not found"
        }
    }

    await Employee.create({
        company_id: company_id,
        address: address,
        age: age,
        gender: gender,
        name: name,
        phonenumber: phoneNumber,
        salary: salary,
        role: role,
    })

    return {
        success: true,
        message: "Employee created successfully"
    }
}

exports.updateEmployee = async (req) => {
    const { employee_id, name, address, phoneNumber, age, gender, salary, role } = req.body;

    const findEMployee = await Employee.findOne({
        where: {
            employee_id: employee_id
        }
    })

    if (!findEMployee) {
        return {
            success: false,
            message: "Employee not found"
        }
    }

    await Employee.update({
        name: name,
        address: address,
        age: age,
        gender: gender,
        phonenumber: phoneNumber,
        salary: salary,
        role: role,
    }, {
        where: {
            employee_id: employee_id
        }
    })

    return {
        success: true,
        message: "Employee updated successfully"
    }
}

exports.getEmployee = async (req) => {
    const { employee_id } = req.body;
    const findEMployee = await Employee.findOne({
        where: {
            employee_id: employee_id
        }
    })

    if (!findEMployee) {
        return {
            success: false,
            message: "Employee not found"
        }
    }

    return {
        success: true,
        message: "Get employee details",
        data: findEMployee
    }
}

exports.deleteEmployee = async (req) => {
    const { employee_id } = req.body;
    const findEMployee = await Employee.findOne({
        where: {
            employee_id: employee_id
        }
    })

    if (!findEMployee) {
        return {
            success: false,
            message: "Employee not found"
        }
    }

    await Employee.destroy({ where: { employee_id: employee_id } })

  return {
    success: true,
    message: "Employee deleted successfully"
  }
}

exports.getAllEmployee = async (req) => {
    const { company_id } = req.body;
    const findAllProducts = await Employee.findAll({
      where: {
        company_id: company_id,
      },
    });
  
    if (!findAllProducts.length === 0) {
      return {
        success: false,
        message: "Product not found",
      };
    }
  
    return {
      success: true,
      message: "Get Product details",
      data: findAllProducts,
    };
  };