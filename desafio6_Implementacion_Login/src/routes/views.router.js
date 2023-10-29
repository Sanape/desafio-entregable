import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.render('login');
});

router.get('/signup', (req, res) => {
  res.render('signup');
});

router.get('/home', (req, res) => {
  console.log('req', req);
  const { email, first_name } = req.session;
  res.render('home', { email, first_name });
});

router.get('/products', (req, res) => {
  res.render('products');
});

router.get('/carts/:cid', (req, res) => {
  const { cid } = req.params;
  res.render('carts', { cid });
});

router.get('/products/:pid', (req, res) => {
  const { pid } = req.params;
  res.render('product', { pid });
});

router.get('/realtimeProducts', (req, res) => {
  res.render('realtimeProducts');
});

router.get('/chat', (req, res) => {
  res.render('chat');
});

export default router;
