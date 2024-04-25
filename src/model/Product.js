const { DataTypes } = require('sequelize');
const { sq } = require("../Database");


const Product = sq.define(
    'product',
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
        product_id: {
            type: DataTypes.STRING,
            defaultValue: DataTypes.UUIDV4,

        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        category: {
            type: DataTypes.STRING,
            allowNull: false,
            
        },
        image: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false,
        }, 
        quantity: {
            type: DataTypes.STRING,
            allowNull: false,
        }, 
        description: {
            type: DataTypes.TEXT({length: "long"}),
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


module.exports = Product;