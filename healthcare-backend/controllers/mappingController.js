const { Patient, Doctor, Mapping } = require('../models/index');

exports.assignDoctor = async (req, res) => {
  const { patientId, doctorId } = req.body;

  try {
    const patient = await Patient.findByPk(patientId);
    if (!patient) {
      return res.status(404).json({ msg: 'Patient not found' });
    }

    const doctor = await Doctor.findByPk(doctorId);
    if (!doctor) {
      return res.status(404).json({ msg: 'Doctor not found' });
    }

    const mappingExists = await Mapping.findOne({
      where: { patientId, doctorId },
    });

    if (mappingExists) {
      return res.status(400).json({ msg: 'This doctor is already assigned to this patient' });
    }

    await Mapping.create({ patientId, doctorId });
    res.status(201).json({ msg: 'Doctor assigned to patient successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.getMappings = async (req, res) => {
  try {
    const mappings = await Mapping.findAll({
      include: [
        { model: Patient, attributes: ['name', 'dateOfBirth'] },
        { model: Doctor, attributes: ['name', 'specialization'] },
      ],
    });
    res.status(200).json(mappings);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};


exports.getDoctorsForPatient = async (req, res) => {
  const { patient_id } = req.params;

  try {
    const patient = await Patient.findByPk(patient_id, {
      include: {
        model: Doctor,
        through: { attributes: [] },
      },
    });

    if (!patient) {
      return res.status(404).json({ msg: 'Patient not found' });
    }

    res.status(200).json(patient.Doctors);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};


exports.deleteMapping = async (req, res) => {
  const { id } = req.params;

  try {
    const mapping = await Mapping.findByPk(id);
    if (!mapping) {
      return res.status(404).json({ msg: 'Mapping not found' });
    }

    await mapping.destroy();
    res.status(200).json({ msg: 'Mapping deleted successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};