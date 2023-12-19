import express from 'express';

import {
  deleteUser,
  updateCurrentUser,
} from '../controllers/usersController.js';

const router = express.Router();

router.delete('/', deleteUser);

router.put('/', updateCurrentUser);

export default router;
