const HttpStatus = require("http-status-codes");
const userHandler = require("../handler/Company");

exports.updateSingleCompany = async function (req, res) {
  try {
    const response = await userHandler.updateSingleCompany(req);
    res.status(HttpStatus.StatusCodes.CREATED).json(response);
  } catch (error) {
    console.log(error.message);
    res.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

exports.updateCompany = async function (req, res) {
  try {
    const response = await userHandler.updateCompany(req);
    res.status(HttpStatus.StatusCodes.CREATED).json(response);
  } catch (error) {
    console.log(error.message);
    res.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

exports.deletCompany = async function (req, res) {
  try {
    const response = await userHandler.deletCompany(req);
    res.status(HttpStatus.StatusCodes.CREATED).json(response);
  } catch (error) {
    console.log(error.message);
    res.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

exports.getAllCompany = async function (req, res) {
    try {
        const response = await userHandler.getAllCompany(req);
        res.status(HttpStatus.StatusCodes.CREATED).json(response);
      } catch (error) {
        console.log(error.message);
        res.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR).json({
          success: false,
          message: "Internal Server Error",
        });
      }
}


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
}
