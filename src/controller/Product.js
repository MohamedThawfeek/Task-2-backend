const HttpStatus = require("http-status-codes");
const userHandler = require("../handler/Product");


exports.createProduct = async function (req, res) {
    try {
      const response = await userHandler.createProduct(req);
      res.status(HttpStatus.StatusCodes.CREATED).json(response);
    } catch (error) {
      console.log(error.message);
      res.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  };

  exports.updateProduct = async function (req, res) {
    try {
      const response = await userHandler.updateProduct(req);
      res.status(HttpStatus.StatusCodes.CREATED).json(response);
    } catch (error) {
      console.log(error.message);
      res.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  };

  exports.getProduct = async function (req, res) {
    try {
      const response = await userHandler.getProduct(req);
      res.status(HttpStatus.StatusCodes.CREATED).json(response);
    } catch (error) {
      console.log(error.message);
      res.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  };

  exports.deleteProduct = async function (req, res) {
    try {
      const response = await userHandler.deleteProduct(req);
      res.status(HttpStatus.StatusCodes.CREATED).json(response);
    } catch (error) {
      console.log(error.message);
      res.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  };

  exports.getAllProduct = async function (req, res) {
    try {
      const response = await userHandler.getAllProduct(req);
      res.status(HttpStatus.StatusCodes.CREATED).json(response);
    } catch (error) {
      console.log(error.message);
      res.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  };