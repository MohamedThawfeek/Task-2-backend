
require('dotenv').config()
const { Sequelize } = require('sequelize')


const sequelize = new Sequelize('postgresql://postgres:QzKQXeBzYTZEQdLMjsbWGUDGoSGEADCn@viaduct.proxy.rlwy.net:38304/railway')

const db = async () => {
    try {
      await sequelize.authenticate();
      console.log("Connection has been established successfully.");
    } catch (error) {
      console.error("Unable to connect to the database:", error);
    }
  };

  module.exports = { sq: sequelize, db };