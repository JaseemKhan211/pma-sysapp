const express = require('express');
const biosetupController = require('../controllers/biosetupController');
const { uploadBioSetupPhoto } = require('../utils/multerStorage'); 

const router = express.Router();

// Middleware to handle file uploads for bio setup photos
// This will use the multer instance defined in multerStorage.js
router.route('/')
    .get(biosetupController.getAllbiosetup)
    .post(uploadBioSetupPhoto, biosetupController.createbiosetup);

// Routes for individual bio setup operations
// The ':bio_setupid' parameter will be used to identify the specific bio setup
router.route('/:bio_setupid')
  .get(biosetupController.getbiosetup)
  .put(biosetupController.updatebiosetup)
  .delete(biosetupController.deletebiosetup);

module.exports = router;