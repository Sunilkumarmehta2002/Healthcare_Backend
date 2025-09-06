const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../db');

const User = require('./user')(sequelize, DataTypes);
const Patient = require('./patient')(sequelize, DataTypes);
const Doctor = require('./doctor')(sequelize, DataTypes);
const Mapping = require('./mapping')(sequelize, DataTypes);

User.hasMany(Patient, { foreignKey: 'userId', onDelete: 'CASCADE' });
Patient.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(Doctor, { foreignKey: 'userId', onDelete: 'CASCADE' });
Doctor.belongsTo(User, { foreignKey: 'userId' });

Patient.belongsToMany(Doctor, { through: Mapping, foreignKey: 'patientId', otherKey: 'doctorId' });
Doctor.belongsToMany(Patient, { through: Mapping, foreignKey: 'doctorId', otherKey: 'patientId' });

const syncModels = async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log('Database synchronized!');
  } catch (error) {
    console.error('Error synchronizing database:', error);
  }
};

module.exports = {
  sequelize,
  User,
  Patient,
  Doctor,
  Mapping,
  syncModels,
};