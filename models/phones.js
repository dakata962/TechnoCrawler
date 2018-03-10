/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('phones', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    site: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    make: {
      type: DataTypes.STRING(45),
      allowNull: true,
    },
    model: {
      type: DataTypes.STRING(45),
      allowNull: true,
      unique: true,
    },
    gb: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
    },
    weigth: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
    },
    price: {
      type: DataTypes.FLOAT(11),
      allowNull: true,
    },
  }, {
    tableName: 'phones',
    timestamps: false,
  });
};