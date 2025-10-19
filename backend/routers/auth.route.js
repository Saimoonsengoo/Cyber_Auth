const express = require('express');
const router = express.Router();
const userController = require('../controller/userContoller')
const User = require('../model/User.model');
const {body} = require('express-validator');
//middleware
const handleErrorMessage = require('../middleware/handleErrorMessage');
const AuthMiddleware = require('../middleware/AuthMiddleware')


router.get('/check', AuthMiddleware, userController.check);

router.post('/signup', [
    body('email').notEmpty().custom(async value => {
        // checking email already in use or not
        const user = await User.findOne({email : value});
        if(user){
            throw new Error('Email alrady in use!!!');
        }
    }),
    body('password').notEmpty(),
    body('name').notEmpty()
],handleErrorMessage, userController.signup )

router.post('/login',[
    body('email').notEmpty(),

],handleErrorMessage,userController.login )

router.post('/logout',handleErrorMessage,userController.logout )

router.post('/verify-email',handleErrorMessage,userController.verifyEmail )

router.post('/forgot-password',handleErrorMessage,userController.forgotPassword )

router.post('/reset-password/:token',handleErrorMessage,userController.resetPassword )

module.exports = router;