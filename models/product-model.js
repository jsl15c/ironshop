const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const myProductSchema = new Schema({
  name:{type:String},
  price:{type:Number, min:1},
  imageUrl:{type:String, default:'/images/product.gif'},
  description:{type:String}
});

const Product = mongoose.model('Product', myProductSchema);
// Product --> products --> db.products.find()
//    |           |
// collection  collection
//   model





module.exports = Product;
