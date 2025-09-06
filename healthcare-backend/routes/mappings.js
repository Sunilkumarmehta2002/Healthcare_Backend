const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const mappingController = require('../controllers/mappingController');

router.post('/', auth, mappingController.assignDoctor);
router.get('/', auth, mappingController.getMappings);
router.get('/:patient_id', auth, mappingController.getDoctorsForPatient);
router.delete('/:id', auth, mappingController.deleteMapping);

module.exports = router;