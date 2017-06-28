const express = require('express');
const router = express.Router();

const ProductModel = require('../models/product-model.js');
const ReviewModel = require('../models/review-model.js');

// ROUTE #1 -> display the form to create a new review

router.get('/products/:productId/reviews/new', (req, res, next) => {
  ProductModel.findById(req.params.productId, (err, productDetails) => {
    if (err) {
      next(err);
      return;
    }
    res.render('review-views/new-review-form.ejs', {
      productDetails:productDetails
    });
  });
});

router.post('/products/:productId/reviews', (req, res, next) => {
  ProductModel.findById(req.params.productId, (err, productDetails) => {
    if (err) {
      next(err);
      return;
    }
    const theReview = new ReviewModel({
      author: req.body.reviewAuthor,
      stars: req.body.reviewStars,
      content: req.body.reviewContent
    });
    // adding review to the product
    productDetails.reviews.push(theReview);
    //save the product with the new review
    productDetails.save((err) => {
      if (err) {
        next(err);
        return;
      }
      res.redirect('/products/' + productDetails._id);
    });
  });
});

// ROUTE #2 -> receive that from submission and do database stuff

module.exports = router;
