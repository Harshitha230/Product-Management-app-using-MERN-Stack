import express from 'express';
import { verifytoken } from '../middleware/auth';
import {authController} from '../controllers/auth.controllers';

export const userRoutes= express.Router();

userRoutes.post('/signup', authController.signup);
userRoutes.post('/login', authController.login);
userRoutes.get('/logout', authController.logout);
userRoutes.post('/welcome', verifytoken, authController.welcome);

