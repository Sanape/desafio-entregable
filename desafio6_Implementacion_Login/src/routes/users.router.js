import { Router } from 'express';
import userManager from '../dao/db/userManager.js';
const router = Router();

// files
// router.post("/", (req, res) => {
//   const { email, password } = req.body;
//   req.session["email"] = email;
//   res.send("Usuario loggeado");
// });

// mongo

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const userDB = await usersManager.findByEmail(email);
  if (!userDB) {
    return res.json({ error: 'This email does not exist' });
  }
  req.session['email'] = email;
  req.session['first_name'] = userDB.first_name;
  if (email === 'adminCoder@coder.com' && password === 'Cod3r123') {
    req.session['isAdmin'] = true;
  }
  res.redirect('/home');
});

router.post('/signup', async (req, res) => {
  const { password } = req.body;
  const hashedPassword = await hashData(password);
  const createdUser = await usersManager.createOne({
    ...req.body,
    password: hashedPassword,
  });
  res.status(200).json({ message: 'User created', createdUser });
});
export default router;
