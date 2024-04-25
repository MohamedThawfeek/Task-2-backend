const HttpStatus = require("http-status-codes");
const userHandler = require("../handler/Employee");


exports.createEmployee = async function (req, res) {
    try {
      const response = await userHandler.createEmployee(req);
      res.status(HttpStatus.StatusCodes.CREATED).json(response);
    } catch (error) {
      console.log(error.message);
      res.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  };

  exports.updateEmployee = async function (req, res) {
    try {
      const response = await userHandler.updateEmployee(req);
      res.status(HttpStatus.StatusCodes.CREATED).json(response);
    } catch (error) {
      console.log(error.message);
      res.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  };

  exports.getEmployee = async function (req, res) {
    try {
      const response = await userHandler.getEmployee(req);
      res.status(HttpStatus.StatusCodes.CREATED).json(response);
    } catch (error) {
      console.log(error.message);
      res.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  };

  exports.deleteEmployee = async function (req, res) {
    try {
      const response = await userHandler.deleteEmployee(req);
      res.status(HttpStatus.StatusCodes.CREATED).json(response);
    } catch (error) {
      console.log(error.message);
      res.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  };

  exports.getAllEmployee = async function (req, res) {
    try {
      const response = await userHandler.getAllEmployee(req);
      res.status(HttpStatus.StatusCodes.CREATED).json(response);
    } catch (error) {
      console.log(error.message);
      res.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  };