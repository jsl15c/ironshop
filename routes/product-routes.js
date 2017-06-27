const express = require('express');
const router = express.Router();
const ProductModel = require('../models/product-model.js');

router.get('/products', (req, res, next) => {
  ProductModel.find((err, productResults) => {
    if (err) {
      next(err);
      return;
    }
    res.render('product-views/products-view.ejs', {
      products:productResults,
    });
  });
});


// STEP #1 of form submission
router.get('/products/new', (req, res, next) => {
  // display "new-product-view.ejs"
  res.render('product-views/new-product-view.ejs');
});

// STEP #2 of form submission
router.post('/products', (req,res,next) => {
    const theProduct = new ProductModel ({
      name:req.body.productName,
      price:req.body.productPrice,
      imageUrl:req.body.productImageUrl,
      description:req.body.productDesc
  });
  theProduct.save((err) => {
    if (err) {
      next(err);
      return;
    }
    //if successful, STEP #3: REDIRECT to URL 🌎
    res.redirect('/products');
    // you can ONLY redirect to a URL
  });
});

module.exports = router;
