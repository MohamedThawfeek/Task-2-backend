const HttpStatus = require("http-status-codes");
const userHandler = require("../handler/UserDetails");


exports.addDetails = async function (req, res) {
    try {
      const response = await userHandler.addDetails(req);
      res.status(HttpStatus.StatusCodes.CREATED).json(response);
    } catch (error) {
      console.log(error.message);
      res.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  };

  exports.updateDetails = async function (req, res) {
    try {
      const response = await userHandler.updateDetails(req);
      res.status(HttpStatus.StatusCodes.CREATED).json(response);
    } catch (error) {
      console.log(error.message);
      res.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  };

  exports.getDetails = async function (req, res) {
    try {
      const response = await userHandler.getDetails(req);
      res.status(HttpStatus.StatusCodes.CREATED).json(response);
    } catch (error) {
      console.log(error.message);
      res.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  };

  
  exports.createCompany = async function (req, res) {
    try {
      const response = await userHandler.createCompany(req);
      res.status(HttpStatus.StatusCodes.CREATED).json(response);
    } catch (error) {
      console.log(error.message);
      res.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  };
  

  exports.editCompany = async function (req, res) {
    try {
      const response = await userHandler.editCompany(req);
      res.status(HttpStatus.StatusCodes.CREATED).json(response);
    } catch (error) {
      console.log(error.message);
      res.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  };


  exports.deleteCompany = async function (req, res) {
    try {
      const response = await userHandler.deleteCompany(req);
      res.status(HttpStatus.StatusCodes.CREATED).json(response);
    } catch (error) {
      console.log(error.message);
      res.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  };