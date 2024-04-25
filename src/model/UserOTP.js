const { DataTypes } = require('sequelize');
const { sq } = require("../Database");


const UserOTP = sq.define(
    'users_otp',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        user_id: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        otp: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        status: {
            type: DataTypes.ENUM,
            values: ["Verify", "Forgot"],
            defaultValue: 'Verify'

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


module.exports = UserOTP;