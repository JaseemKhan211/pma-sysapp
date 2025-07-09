const multer = require('multer');
const path = require('path');

// Define storage for the uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/img/biosetup');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, `${file.fieldname}-${uniqueSuffix}.png`);
  }
});

// Create the multer instance with the defined storage
const upload = multer({ storage });

// Export the multer instance for use in other parts of the application
exports.uploadBioSetupPhoto = upload.single('bio_setup_data');