const express = require('express');
const biosetupController = require('../controllers/biosetupController');

const router = express.Router();

router.route('/')
    .get(biosetupController.getAllbiosetup)
    .post(biosetupController.createbiosetup);

router.route('/:bio_setupid')
  .get(biosetupController.getbiosetup)
  .put(biosetupController.updatebiosetup)
  .delete(biosetupController.deletebiosetup);

module.exports = router;