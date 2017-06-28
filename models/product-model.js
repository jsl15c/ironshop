const mongoose = require('mongoose');

const ReviewModel = require('./review-model.js');

const Schema = mongoose.Schema;

const myProductSchema = new Schema({
  name:{
    type:String,
    required:true,
    minlength:3,
    maxlength:100
  },
  price:{
    type:Number,
    default:1,
    min:0,
    max:1000
  },
  imageUrl:{
    type:String,
    default:'/images/product.gif'
  },
  description:{type:String},

  category: {
    type:String,
    enum:['Tech', 'Food', 'Apparel', 'Home', 'Office']
  },
  // add a field inside of product documents called 'reviews'
  // an array of Review Model objects with content, stars and author
  reviews: [ ReviewModel.schema ]
//                         |
//  schema of ReviewModel (different from Schema var)
});


// Model
//  constructor function that allows us to interact with a single collection
const Product = mongoose.model('Product', myProductSchema);
// Product --> products --> db.products.find()
//    |           |
// collection  collection
//   model





module.exports = Product;
