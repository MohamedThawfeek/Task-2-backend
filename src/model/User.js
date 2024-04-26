const { DataTypes } = require('sequelize');
const { sq } = require("../Database");
const UserDetails = require('./UserDetails');
const Company = require('./Company');


const User = sq.define(
    'users',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,

        },
        user_id: {
            type: DataTypes.STRING,
            defaultValue: DataTypes.UUIDV4,
            field: 'user_id',
            primaryKey: true,
            
        },
        firstname: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastname: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        phonenumber: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        verify: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
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


User.belongsTo(UserDetails, {foreignKey: "user_id"});
User.hasMany(Company, {foreignKey: "user_id"});


module.exports = User;