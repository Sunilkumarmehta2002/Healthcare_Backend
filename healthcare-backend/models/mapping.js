const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Mapping = sequelize.define('Mapping', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
  });

  return Mapping;
};