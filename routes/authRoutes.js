import express from 'express';
import { login, register } from '../controllers/authController.js';

const router = express.Router();

// Login routes
router.route('/')
  .get((req, res) => res.render('login', { message: null }))
  .post(login);

// Register routes
router.route('/register')
  .get((req, res) => res.render('register', { message: null }))
  .post(register);

export default router;