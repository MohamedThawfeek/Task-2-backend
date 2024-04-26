const { DataTypes } = require('sequelize');
const { sq } = require("../Database");
const Employee = require('./Employee');
const Product = require('./Product');


const Company = sq.define(
    'company',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
        },
        company_id: {
            type: DataTypes.STRING,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
            field: 'company_id',
        },
        user_id: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
            field: 'user_id',
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
        gstnumber: {
            type: DataTypes.STRING,
            allowNull: false,
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

Company.hasMany(Employee, {foreignKey: "company_id"});
Company.hasMany(Product, {foreignKey: "company_id"});




module.exports = Company;