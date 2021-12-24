
const express = require("express");
const router = express.Router();

const userCtrl = require('../controllers/Users');

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/:id', userCtrl.getProfile);
router.put('/:id', userCtrl.updateProfile);
router.delete('/:id', userCtrl.deleteProfile);





module.exports = router;
