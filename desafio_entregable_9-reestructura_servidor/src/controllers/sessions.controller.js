import passport from 'passport';
import { usersService } from '../services/users.service.js';

class SessionsController {
    localLoginAuth = () => {
        passport.authenticate('login', { successRedirect: "/products", failureRedirect: "/loginerror" })
    }

    githubSignup = () => {
        passport.authenticate('github', { scope: ['user:email'] })
    }

    githubLoginAuth = () => {
        passport.authenticate('github', { failureRedirect: '/loginerror', successRedirect: "/products" })
    }

    sessionLogout = (req, res) => {
        req.session.destroy(() => {
            res.redirect("/");
        });
    }

    currentSession = async (req, res) => {
        if (req.user) {
            const userFound = await usersService.findByEmail(req.user.email);
            const { first_name, last_name, age, email, role } = userFound;
            res.render('currentuser', { first_name, last_name, age, email, role });
        } else {
            const userFound = await usersService.findByEmail(req.session.email);
            const { first_name, last_name, age, email, role } = userFound;
            res.render('currentuser', { first_name, last_name, age, email, role });
        }
    }
}

export const sessionsController = new SessionsController();