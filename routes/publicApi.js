var express = require('express');
var user = require('../app/controllers/publicApi.js');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

/* To register a user. */
router.post('/register', user.register);
router.post('/updateMany', user.updateMany);
router.post('/getUpdatedValues', user.getUpdatedValues);
/* To verify email. */
router.get('/verify-email/:token', user.verifyEmail);

/* To login. */
router.post('/login', user.login);

/* To recover password. */
router.post('/forgot_password', user.forgotPassword);

/* To reset password. */
router.post('/reset_password', user.resetPassword);


router.post('/imageUpload', user.imageUpload);
router.post('/check', user.check);
router.post('/createElement', user.createElement);
router.post('/createFile', user.createFile);

module.exports = router;

