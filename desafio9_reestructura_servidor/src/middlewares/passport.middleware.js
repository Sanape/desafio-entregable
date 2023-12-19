import passport from 'passport';
//import { usersManager } from '../managers/usersManager.js';
import { usersMongo } from '../daos/users.mongo.js';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as GithubStrategy } from 'passport-github2';
import { hashData, compareData } from '../utils.js';
import config from '../config/config.js';

passport.use("signup", new LocalStrategy(
    {
        usernameField: "email",
        passReqToCallback: true,
    },
    async (req, email, password, done) => {
        try {
            const userFound = await usersMongo.findByEmail(email);
            if (userFound) {
                return done(null, false);
            }
            const hashedPass = await hashData(password);
            const createdUser = await usersMongo.createOne({ ...req.body, password: hashedPass });
            done(null, createdUser);
        } catch (error) {
            done(error);
        }
    }
))

passport.use("login", new LocalStrategy(
    {
        usernameField: "email",
    },
    async (email, password, done) => {
        try {
            //console.log("email: ", email)
            const userFound = await usersMongo.findByEmail(email);
            //console.log(userFound)
            if (!userFound) {
                return done(null, false);
            }
            const comparePass = await compareData(password, userFound.password);
            if (!comparePass) {
                return done(null, false);
            }
            done(null, userFound);
        } catch (error) {
            done(error);
        }
    }
))

passport.use("github", new GithubStrategy(
    {
        clientID: config.github_client_id,
        clientSecret: config.github_client_secret,
        callbackURL: config.github_callback_url,
    },
    async (accessToken, refreshToken, profile, done) => {
        const hashedPass = await hashData("password")
        try {
            const userFound = await usersMongo.findByEmail(profile._json.email);
            //login
            if (userFound) {
                if (userFound.from_github) {
                    return done(null, userFound);
                } else {
                    return done(null, false);
                }
            } else {
                //signup
                const newUser = {
                    first_name: profile._json.name.split(" ")[0],
                    last_name: profile._json.name.split(" ")[1],
                    email: profile._json.email,
                    age: 18,
                    password: hashedPass,
                    isAdmin: profile._json.email === "adminCoder@coder.com" && this.password === "adminCod3r123" ? true : false,
                    from_github: true,
                }
                const createdUser = await usersMongo.createOne(newUser);
                done(null, createdUser);
            }
        } catch (error) {
            done(error);
        }
    }
))

passport.serializeUser(function (user, done) {
    done(null, user._id);
});

passport.deserializeUser(async function (id, done) {
    try {
        const user = await usersMongo.findById(id);
        done(null, user);
    } catch (error) {
        done(error);
    }
});