import { Router } from 'express';
import passport from 'passport';
import { usersService } from '../services/users.service.js';

const router = Router();

//passport-local
router.post('/login', passport.authenticate('login', { successRedirect: "/products", failureRedirect: "/loginerror" }))

router.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
})

//passport-github2
router.get('/auth/github', passport.authenticate('github', { scope: ['user:email'] }));

router.get('/github', passport.authenticate('github', { failureRedirect: '/loginerror', successRedirect: "/products" }));

//current
router.get('/current', async (req, res) => {
  if (req.user) {
    const userFound = await usersService.findByEmail(req.user.email);
    const { first_name, last_name, age, email, role } = userFound;
    res.render('currentuser', { first_name, last_name, age, email, role });
  } else {
    const userFound = await usersService.findByEmail(req.session.email);
    const { first_name, last_name, age, email, role } = userFound;
    res.render('currentuser', { first_name, last_name, age, email, role });
  }
})

export default router;