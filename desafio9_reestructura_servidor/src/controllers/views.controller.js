import { productsService } from '../services/products.service.js';
import { cartsService } from '../services/carts.service.js';

class ViewsController {
    loginRender = (req, res) => {
        res.render('login');
    }

    loginErrorRender = (req, res) => {
        res.render("loginerror");
    }

    signupRender = (req, res) => {
        res.render("signup");
    }

    registerErrorRender = (req, res) => {
        res.render("signuperror");
    }

    productsRender = async (req, res) => {
        const products = await productsService.findAll();
        if (req.user) {
            const { first_name, last_name, isAdmin } = req.user;
            var role = "";
            if (isAdmin) {
                role = "admin";
            } else {
                role = "user";
            }
            res.render('products', { products, first_name, last_name, role });
        } else {
            const { first_name, last_name, isAdmin } = req.session;
            var role = "";
            if (isAdmin) {
                role = "admin";
            } else {
                role = "user";
            }
            res.render('products', { products, first_name, last_name, role });
        }
    }

    populatedCartRender = async (req, res) => {
        const cartId = req.params.cid;
        const cartFound = await cartsService.findAndPopulate(cartId);
        res.render('cart', { cartFound });
    }

    productDetailsRender = async (req, res) => {
        const productId = req.params.pid;
        const productFound = await productsService.findById(productId);
        const { _id, title, description, price, stock, category } = productFound;
        res.render('details', { _id, title, description, price, stock, category });
    }
}

export const viewsController = new ViewsController();