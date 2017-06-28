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

  console.log('SALDKJASLKDJLSAHKFHSDKLAHSDHSAIUDHSKLADHJ');
  console.log('BEFORE SAVE');
  console.log(theProduct.errors);


  theProduct.save((err) => {
    if (err && theProduct.errors === undefined) {
      next(err);
      return;
    }
    else if (err && theProduct.errors) {
      res.render('product-views/new-product-view.ejs', {
        // view variables, display form again
        validationErrors:theProduct.errors
      });
      return;
    }
    //if successful, STEP #3: REDIRECT to URL 🌎
    res.redirect('/products');
    // you can ONLY redirect to a URL
  });
});
// /products/details?myId=595174d9da199e177c465c50
router.get('/products/:myId', (req, res, next) => {
  ProductModel.findById(req.params.myId, (err, theProduct) => {
    if (err) {
      next(err);
      return;
    }
    res.render('product-views/product-details-view.ejs', {
      productDetails: theProduct
    });
  });
});


// STEP #1 of form submission for UPDATING
//  same as DETAILS PAGE BUT DIFFERENT VIEW
router.get('/products/:myId/edit', (req, res, next) => {
  ProductModel.findById(req.params.myId, (err, theProduct) => {
    if (err) {
      next(err);
      return;
    }
    res.render('product-views/edit-product-view.ejs', {
      productDetails:theProduct
    });
  });
});

// STEP 2
router.post('/products/:myId/update', (req, res, next) => {
// object of fields to update
    ProductModel.findByIdAndUpdate( req.params.myId, {
      name:req.body.productName,
      price:req.body.productPrice,
      imageUrl:req.body.productImageUrl,
      description:req.body.productDesc
    },

    (err, productDetails) => {
      if (err) {
        next(err);
        return;
      }
      res.redirect('/products/' + productDetails._id);
    });
});

router.post('/products/:myId/delete', (req, res, next) => {
  ProductModel.findByIdAndRemove(req.params.myId,
    (err, productDetails) => {
        if (err) {
          next(err);
          return;
        }
        res.redirect('/products');
  });
});




module.exports = router;
