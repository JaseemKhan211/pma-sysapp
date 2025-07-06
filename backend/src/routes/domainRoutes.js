const express = require('express');
const domainController = require('../controllers/domainController');

const router = express.Router();

router.route('/')
  .get(domainController.getAllDomains)
  .post(domainController.createDomain);

router.route('/:domainid')
  .get(domainController.getDomain)
  .put(domainController.updateDomain)
  .delete(domainController.deleteDomain);

module.exports = router;