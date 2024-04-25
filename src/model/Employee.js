const { DataTypes } = require('sequelize');
const { sq } = require("../Database");


const Employee = sq.define(
    'employee',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        company_id: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        employee_id: {
            type: DataTypes.STRING,
            defaultValue: DataTypes.UUIDV4

        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false,
            
        },
        phonenumber: {
            type: DataTypes.STRING,
            allowNull: false,
        }, 
        age: {
            type: DataTypes.STRING,
            allowNull: false,
        }, 
        gender: {
            type: DataTypes.ENUM,
            allowNull: false,
            values: ["Male", "Female"]
        }, 
        salary: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        role: {
            type: DataTypes.ENUM,
            allowNull: false,
            values: ["Admin", "Supervisor", "Manager", "Employee"]       
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


module.exports = Employee;