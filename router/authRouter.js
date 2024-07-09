const express = require('express');
const router = express.Router();
const authApi = require('../api/auth.api');

router.post('/api/register',authApi.Register);
router.post('/api/verify',authApi.confirmOTP);
router.post('/api/login',authApi.Login);

module.exports = router;