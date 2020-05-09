const express = require('express');

const router = express.Router();

const { signUp , singIn} = require('../handlers/auth');

router.post('/signup' , signUp);
router.post('/signin' , singIn);


module.exports = router;