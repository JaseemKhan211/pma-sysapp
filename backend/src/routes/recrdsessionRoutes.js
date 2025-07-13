const express = require('express');
const recrdsessionController = require('../controllers/recrdsessionController');


const router = express.Router();

// MMiddleware to handle file uploads for record session photos
router.route('/')
  .post(recrdsessionController.createRecordSession)
  .get(recrdsessionController.getAllRecordSessions);

// Routes for individual record session operations
// The ':recrdsessionid' parameter will be used to identify the specific record session
router.route('/:recrdsessionid')
  .put(recrdsessionController.updateRecordSession)
  .delete(recrdsessionController.deleteRecordSession)
  .get(recrdsessionController.getRecordSession);

module.exports = router;