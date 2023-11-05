import express from 'express';

import {
  body_must_contain_attributes,
  meetsWithEmailRequirements,
  meetsWithPasswordRequirements,
} from '../middlewares/validateBodyRequirements.js';

import { login, logout, register } from '../controllers/sessionController.js';

const router = express.Router();

router.post(
  '/login',
  meetsWithEmailRequirements,
  body_must_contain_attributes(['password']),
  login
);

router.post(
  '/register',
  body_must_contain_attributes([
    'first_name',
    'last_name',
    'email',
    'age',
    'password',
  ]),
  meetsWithEmailRequirements,
  meetsWithPasswordRequirements,
  register
);

router.delete('/', logout);

export default router;
