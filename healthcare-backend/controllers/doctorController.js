const { Doctor, User } = require('../models/index');

exports.addDoctor = async (req, res) => {
  const { name, specialization, contact } = req.body;
  const userId = req.user.id;

  try {
    const newDoctor = await Doctor.create({
      name,
      specialization,
      contact,
      userId,
    });
    res.status(201).json(newDoctor);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.getDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.findAll({
      include: {
        model: User,
        attributes: ['name', 'email'],
      },
    });
    res.status(200).json(doctors);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.getDoctorById = async (req, res) => {
  const { id } = req.params;

  try {
    const doctor = await Doctor.findByPk(id, {
      include: {
        model: User,
        attributes: ['name', 'email'],
      },
    });
    if (!doctor) {
      return res.status(404).json({ msg: 'Doctor not found' });
    }
    res.status(200).json(doctor);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};


exports.updateDoctor = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;
  const { name, specialization, contact } = req.body;

  try {
    const doctor = await Doctor.findOne({ where: { id, userId } });
    if (!doctor) {
      return res.status(404).json({ msg: 'Doctor not found or unauthorized' });
    }

    await doctor.update({
      name,
      specialization,
      contact,
    });

    res.status(200).json({ msg: 'Doctor updated successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.deleteDoctor = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  try {
    const doctor = await Doctor.findOne({ where: { id, userId } });
    if (!doctor) {
      return res.status(404).json({ msg: 'Doctor not found or unauthorized' });
    }

    await doctor.destroy();
    res.status(200).json({ msg: 'Doctor deleted successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
