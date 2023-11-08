const express = require('express');
const router = express.Router();
const passport  = require('passport');
const adminLogController = require('../controllers/admin_log');

router.get('/sign-up', adminLogController.admin_sign_up);
router.get('/sign-in', adminLogController.admin_sign_in);
router.get('/forgot-password', adminLogController.reset_password);
router.get('/home', adminLogController.home);
router.get('/dashboard',passport.checkAdminAuthentication, adminLogController.admin_dashboard);
router.get('/profile/:id',passport.checkAdminAuthentication, adminLogController.admin_profile);
router.get('/destroy-user/:id', passport.checkAdminAuthentication, adminLogController.destroy_user);
router.get('/destroy-admin/:id',passport.checkAdminAuthentication, adminLogController.removeAdmin);
router.get('/request-review', adminLogController.request_review);
router.get('/update_profile_admin/:id',passport.checkAdminAuthentication,adminLogController.update_profile_admin);
router.post('/create_update_admin/:id',passport.checkAdminAuthentication, adminLogController.create_update_admin);
router.post('/review', adminLogController.submitReviewRequest);
router.post('/create', adminLogController.create);
router.post('/user-to-admin/:id',passport.checkAdminAuthentication,adminLogController.makeUserAdmin);
router.post('/create-admin-sessions',passport.authenticate(
    'localAdmin',
    {
        failureRedirect : '/admin/sign-in'
    }
),adminLogController.create_admin_session);

router.get('/sign-out', adminLogController.destroy_admin_session);
router.get('/update-password', adminLogController.update_password);

module.exports = router;