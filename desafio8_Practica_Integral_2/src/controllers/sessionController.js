import userManager from "../dao/DB/UserManager.js";
import cartManager from "../dao/DB/CartManager.js";

async function register(req, res, next) {
  try {
    const result = await userManager.create(req.body);

    const userCreated = await userManager.getByFilter({
      email: result.email,
    });

    await cartManager.create({
      userId: userCreated._id,
    });

    res.status(200).json({ message: result });
  } catch (error) {
    next(error);
  }
}

async function logout(req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.render("login");
  });
}

async function getActualUser(req, res, next) {
  try {
    res.status(200).send({ message: req.user });
  } catch (error) {
    next(error);
  }
}

export { logout, register, getActualUser };
