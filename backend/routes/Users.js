
const express = require("express");
const router = express.Router();
const auth = require('../middlewares/auth');

const userCtrl = require('../controllers/Users');

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/:id',  auth,  userCtrl.getProfile);
router.put('/:id',  auth, userCtrl.updateProfile);
router.delete('/:id',  auth, userCtrl.deleteProfile);





module.exports = router;
