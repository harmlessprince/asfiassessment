const { Sequelize, DataTypes } = require('sequelize');

const db  = require('../config/database');
const Player = db.define('player', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    title:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    body: {
        type: DataTypes.TEXT,
        allowNull: false,
    }
});

module.exports = Player;