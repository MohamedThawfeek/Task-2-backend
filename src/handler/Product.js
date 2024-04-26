const Company = require("../model/Company");
const Product = require("../model/Product");

exports.createProduct = async (req) => {
  const { company_id, name, category, price, quantity, description, image } = req.body;

  const findUser = await Company.findOne({
    where: {
      company_id,
    },
  });

  if (!findUser) {
    return {
      success: false,
      message: "Company not found",
    };
  }

  await Product.create({
    company_id: company_id,
    name: name,
    category: category,
    price: price,
    quantity: quantity,
    description: description,
    image
  });

  return {
    success: true,
    message: "Product created successfully",
  };
};

exports.updateProduct = async (req) => {
  const { product_id, name, category, price, quantity, description } = req.body;

  const findProduct = await Product.findOne({
    where: {
      product_id: product_id,
    },
  });

  if (!findProduct) {
    return {
      success: false,
      message: "Product not found",
    };
  }

  await Product.update(
    {
      name,
      category,
      price,
      quantity,
      description,
    },
    {
      where: {
        product_id: product_id,
      },
    }
  );

  return {
    success: true,
    message: "Product updated successfully",
  };
};

exports.getProduct = async (req) => {
  const { product_id } = req.body;
  const findEMployee = await Product.findOne({
    where: {
        product_id: product_id,
    },
  });

  if (!findEMployee) {
    return {
      success: false,
      message: "Product not found",
    };
  }

  return {
    success: true,
    message: "Get Product details",
    data: findEMployee,
  };
};

exports.deleteProduct = async (req) => {
  const { product_id } = req.body;
  const findEMployee = await Product.findOne({
    where: {
        product_id: product_id,
    },
  });

  if (!findEMployee) {
    return {
      success: false,
      message: "Product not found",
    };
  }

  await Product.destroy({ where: { product_id: product_id } });

  return {
    success: true,
    message: "Product deleted successfully",
  };
};


exports.getAllProduct = async (req) => {
    const { company_id } = req.body;
    const findAllProducts = await Product.findAll({
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