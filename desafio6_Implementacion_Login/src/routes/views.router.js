import { Router } from 'express';

const router = Router();

function isLoggedIn(req, res, next) {
  if (req.session.email) {
    next();
  } else {
    res.redirect('http://localhost:8080/login');
  }
}

function isNotLoggedIn(req, res, next) {
  if (!req.session.email) {
    next();
  } else {
    res.redirect('http://localhost:8080/products');
  }
}

router.get('/', isLoggedIn, (req, res) => {
  res.render('home');
});

router.get('/products', isLoggedIn, (req, res) => {
  res.render('products');
});

router.get('/carts/:cid', isLoggedIn, (req, res) => {
  const cartId = req.params.cid;
  res.render('carts', { cartId });
});

router.get('/products/:pid', isLoggedIn, (req, res) => {
  const productId = req.params.pid;
  res.render('product', { productId });
});

router.get('/realtimeProducts', isLoggedIn, (req, res) => {
  res.render('realtimeProducts');
});

router.get('/chat', isLoggedIn, (req, res) => {
  res.render('chat');
});

router.get('/login', isNotLoggedIn, (req, res) => {
  res.render('login');
});

router.get('/register', isNotLoggedIn, (req, res) => {
  res.render('register');
});

router.get('/profile', isLoggedIn, (req, res) => {
  res.render('profile');
});

export default router;
