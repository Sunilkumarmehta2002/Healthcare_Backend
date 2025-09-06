const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const patientController = require('../controllers/patientController');

router.post('/', auth, patientController.addPatient);
router.get('/', auth, patientController.getPatients);
router.get('/:id', auth, patientController.getPatientById);
router.put('/:id', auth, patientController.updatePatient);
router.delete('/:id', auth, patientController.deletePatient);

module.exports = router;