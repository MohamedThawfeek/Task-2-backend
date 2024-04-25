const jwt = require("jsonwebtoken");
const User = require('../model/User')


exports.userAuth = async (req, res, next) => {
  try {
    const token = req.headers["authorization"];
    if (!token)
      return res.status(404).send({
        success: false,
        message: "Token not provided!",
      });
    const data = await jwt.verify(token, process.env.SECRET_KEY);
    const find_user = await User.findOne({
      where: {
        user_id: data?.id,
      },
    });
    if (!find_user) {
      return res.status(404).send({
        success: false,
        message: "Invalid token provided!",
      });
    }

    req.id = find_user.user_id;
    next();
  } catch (error) {
    return res.status(403).send({
      success: false,
      message: error.message + " Error From Auth Middleware" || "Something went wrong",
    });
  }
};