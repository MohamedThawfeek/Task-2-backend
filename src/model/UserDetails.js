const { DataTypes } = require('sequelize');
const { sq } = require("../Database");
const User = require('./User');


const UserDetails = sq.define(
    'users_details',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
        },
        user_id: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
            field: "user_id",
        },
        dob: {
            type: DataTypes.DATE,
            allowNull: false

        },
        gender: {
            type: DataTypes.ENUM,
            values: ['Male', 'Female'],
            allowNull: false
        },
        qualification: {
            type: DataTypes.JSON,
        },  
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        updatedAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        }
        
    },

    sq.sync()
);


module.exports = UserDetails;