const HttpStatus = require("http-status-codes");
const userHandler = require("../handler/User");


exports.signup = async function (req, res) {
    try {
      const response = await userHandler.createUser(req);
      res.status(HttpStatus.StatusCodes.CREATED).json(response);
    } catch (error) {
      console.log(error.message);
      res.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  };


  exports.signin = async function (req, res) {
    try {
      const response = await userHandler.signIn(req);
      res.status(HttpStatus.StatusCodes.CREATED).json(response);
    } catch (error) {
      console.log(error.message);
      res.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  };


  exports.userDetails = async function (req, res) {
    try {
      const response = await userHandler.userDetails(req.id);
      res.status(HttpStatus.StatusCodes.CREATED).json(response);
    } catch (error) {
      console.log(error.message);
      res.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  };


  exports.userDetailsUpdate = async function (req, res) {
    try {
      const response = await userHandler.userDetailsUpdate(req);
      res.status(HttpStatus.StatusCodes.CREATED).json(response);
    } catch (error) {
      console.log(error.message);
      res.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  };

  exports.deleteUser = async function (req, res) {
    try {
      const response = await userHandler.deleteUser(req.id);
      res.status(HttpStatus.StatusCodes.CREATED).json(response);
    } catch (error) {
      console.log(error.message);
      res.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  };

  exports.verifyUser = async function (req, res) {
    try {
      const response = await userHandler.verifyUser(req);
      res.status(HttpStatus.StatusCodes.CREATED).json(response);
    } catch (error) {
      console.log(error.message);
      res.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  };
  
  exports.listCompany = async function (req, res) {
    try {
      const response = await userHandler.listCompany(req);
      res.status(HttpStatus.StatusCodes.CREATED).json(response);
    } catch (error) {
      console.log(error.message);
      res.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  };

  exports.resend = async function (req, res) {
    try {
      const response = await userHandler.resend(req);
      res.status(HttpStatus.StatusCodes.CREATED).json(response);
    } catch (error) {
      console.log(error.message);
      res.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  };