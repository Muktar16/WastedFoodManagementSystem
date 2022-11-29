const express = require('express');
const router = express.Router();
const ctrlUser = require('../controllers/user.controller');
const ctrlAdmin = require('../controllers/admin.controller');

router.post('/rest-register', ctrlUser.rest_register);
router.post('/ngo-register', ctrlUser.ngo_register);
router.post('/authenticate', ctrlUser.authenticate);
router.post('/admin-authenticate', ctrlAdmin.authenticate);
//router.get('/userProfile', ctrlUser.userProfile);
//router.post('/verifyJWT', ctrlUser.verifyJwtToken);

module.exports = router;