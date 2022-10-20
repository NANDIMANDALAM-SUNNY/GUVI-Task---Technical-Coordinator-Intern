var express = require('express');
const { Register, Login,Profile, UpdateProfile } = require('../controllers/user');
const { validate } = require('../utils/util');
var router = express.Router();


router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


router.post('/register',Register)
router.post('/login',Login)
router.get('/profile',Profile)
router.put('/update-profile',validate ,UpdateProfile)




module.exports = router;
