const express = require('express');
const uploaderController = require('../controllers/uploaderController');


const router = express.Router();

// MMiddleware to handle file uploads for uploader photos
router.route('/')
  .post(uploaderController.createUploader)
  .get(uploaderController.getAllUploaders);

// Routes for individual uploader operations
// The ':uploaderid' parameter will be used to identify the specific uploader
router.route('/:uploaderid')
  .put(uploaderController.updateUploader)
  .delete(uploaderController.deleteUploader)
  .get(uploaderController.getUploader);

module.exports = router;