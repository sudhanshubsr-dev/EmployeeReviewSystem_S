const express = require('express');
const router = express.Router();

const landingPageController = require('../controllers/landing_page_controller');

router.get('/', landingPageController.landing);
router.use('/admin', require('./admin'));
router.use('/user', require('./user'));


module.exports = router;