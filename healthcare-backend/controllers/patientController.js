const { Patient, User } = require('../models/index');

// Add a new patient
exports.addPatient = async (req, res) => {
  const { name, dateOfBirth, gender, address } = req.body;
  const userId = req.user.id;

  try {
    const newPatient = await Patient.create({
      name,
      dateOfBirth,
      gender,
      address,
      userId,
    });
    res.status(201).json(newPatient);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.getPatients = async (req, res) => {
  const userId = req.user.id;

  try {
    const patients = await Patient.findAll({
      where: { userId },
      include: {
        model: User,
        attributes: ['name', 'email'],
      },
    });
    res.status(200).json(patients);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.getPatientById = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  try {
    const patient = await Patient.findOne({
      where: { id, userId },
      include: {
        model: User,
        attributes: ['name', 'email'],
      },
    });

    if (!patient) {
      return res.status(404).json({ msg: 'Patient not found' });
    }

    res.status(200).json(patient);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.updatePatient = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;
  const { name, dateOfBirth, gender, address } = req.body;

  try {
    const patient = await Patient.findOne({ where: { id, userId } });
    if (!patient) {
      return res.status(404).json({ msg: 'Patient not found or unauthorized' });
    }

    await patient.update({
      name,
      dateOfBirth,
      gender,
      address,
    });

    res.status(200).json({ msg: 'Patient updated successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};


exports.deletePatient = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  try {
    const patient = await Patient.findOne({ where: { id, userId } });
    if (!patient) {
      return res.status(404).json({ msg: 'Patient not found or unauthorized' });
    }

    await patient.destroy();
    res.status(200).json({ msg: 'Patient deleted successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};