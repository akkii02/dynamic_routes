const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
    res.render('admin/edit-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        editing: false,
    });
};

exports.postAddProduct = (req, res, next) => {
    const { title, imageUrl, price, description } = req.body;
    req.user.createProduct({
        title,
        price,
        imageUrl,
        description,
    })
    .then(result => {
        console.log('Created Product', result);
        res.redirect('/admin/products');
    })
    .catch(err => console.log(err));
};

exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit === 'true';
    if (!editMode) {
        return res.redirect('/');
    }
    const prodId = req.params.productId;
    req.user.getProducts({ where: { id: prodId } })
    .then(products => {
        const product = products[0];
        if (!product) {
            return res.redirect('/');
        }
        res.render('admin/edit-product', {
            pageTitle: 'Edit Product',
            path: '/admin/edit-product',
            editing: editMode,
            product: product,
        });
    })
    .catch(err => console.log(err));
};

exports.postEditProduct = (req, res, next) => {
    const { productId, title, price, imageUrl, description } = req.body;
    Product.findByPk(productId)
    .then(product => {
        if (!product) {
            return res.redirect('/');
        }
        product.title = title;
        product.price = price;
        product.imageUrl = imageUrl;
        product.description = description;
        return product.save();
    })
    .then(result => {
        console.log('UPDATED PRODUCT', result);
        res.redirect('/admin/products');
    })
    .catch(err => console.log(err));
};

exports.getProducts = (req, res, next) => {
    req.user.getProducts()
    .then(products => {
        res.render('admin/products', {
            prods: products,
            pageTitle: 'Admin Products',
            path: '/admin/products',
        });
    })
    .catch(err => console.log(err));
};

exports.postDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    Product.findByPk(prodId)
    .then(product => {
        if (!product) {
            return res.redirect('/admin/products');
        }
        return product.destroy();
    })
    .then(result => {
        console.log('DESTROYED PRODUCT', result);
        res.redirect('/admin/products');
    })
    .catch(err => console.log(err));
};
