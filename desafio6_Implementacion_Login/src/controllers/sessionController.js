import sessionManager from '../dao/DB/SessionManager.js';

async function login(req, res, next) {
  try {
    const { email, password } = req.body;

    let result;

    if (email === 'adminCoder@coder.com' && password === 'adminCod3r123') {
      result = {
        email: 'adminCoder@coder.com',
        password: 'adminCod3r123',
        age: 9,
        first_name: 'Coder',
        last_name: 'House',
        role: 'admin',
      };

      req.session['email'] = result.email;
      req.session['role'] = result.role;

      delete result.password;
    } else {
      result = await sessionManager.login(email, password);

      delete result._doc.password;

      req.session['email'] = email;
      req.session['role'] = result.role;
    }

    res.status(200).json({ message: result });
  } catch (error) {
    next(error);
  }
}

async function register(req, res, next) {
  try {
    const result = await sessionManager.create(req.body);

    delete result._doc.password;

    req.session['email'] = result.email;
    req.session['role'] = result.role;

    res.status(200).json({ message: result });
  } catch (error) {
    next(error);
  }
}

async function logout(req, res, next) {
  try {
    req.session.destroy((err) => {
      if (err) {
        return res.json({ status: 'Logout ERROR', body: err });
      }
      res.status(200).json({ message: 'Logout successfully' });
    });
  } catch (error) {
    next(error);
  }
}

export { logout, login, register };
