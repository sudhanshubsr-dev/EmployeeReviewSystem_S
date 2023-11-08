const express = require('express');
const router = express.Router();
const passport = require('passport')

const userLogController = require('../controllers/user_log');


router.get('/sign-up', userLogController.user_sign_up);
router.get('/sign-in', userLogController.user_sign_in);
router.get('/forgot-password', userLogController.reset_password);
router.get('/home',userLogController.home);
// routes/user.js
router.get(`/profile/:id`,passport.checkAuthentication, userLogController.profile);
router.get('/review/:id', passport.checkAuthentication,userLogController.review);
router.get('/update_profile/:id',passport.checkAuthentication,userLogController.update_profile);
router.post('/create_update/:id',passport.checkAuthentication, userLogController.create_update);
router.post('/create-user', userLogController.create_user);
router.post('/review/create', passport.checkAuthentication, userLogController.createReview);
router.post('/update-password', userLogController.update_password);

// passport as a middle-ware to authenticate
router.post('/create-sessions',passport.authenticate(
    'local',
    {
        failureRedirect : '/user/sign-in'
    }
),userLogController.create_session);

router.get('/sign-out', userLogController.destroy_session);

module.exports = router;