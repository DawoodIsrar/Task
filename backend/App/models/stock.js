const express = require("express");
const { Sequelize, DataTypes, QueryTypes } = require("sequelize");
module.exports = (sequelize, Sequelize, DataTypes) => {
  const stocks = sequelize.define("stocks", {
  
    variant: {
      type: DataTypes.STRING,
      allowNull: false
    },
    stock: {
      type: DataTypes.STRING,
      allowNull:false
    },
   
  },
    {
      createdAt: false,
      updatedAt: false
    }
  );

  return stocks;
};
