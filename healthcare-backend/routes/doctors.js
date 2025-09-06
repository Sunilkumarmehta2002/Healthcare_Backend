const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const doctorController = require('../controllers/doctorController');

router.post('/', auth, doctorController.addDoctor);

router.get('/', auth, doctorController.getDoctors);

router.get('/:id', auth, doctorController.getDoctorById);

router.put('/:id', auth, doctorController.updateDoctor);

router.delete('/:id', auth, doctorController.deleteDoctor);

module.exports = router;
