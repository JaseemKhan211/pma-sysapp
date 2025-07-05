const express = require('express');
const domainController = require('../controllers/domainController');

const router = express.Router();

router.post('/', domainController.createDomain);
router.put('/', domainController.updateDomain);
router.delete('/:domainid', domainController.deleteDomain);
router.get('/:domainid', domainController.getDomain);

module.exports = router;