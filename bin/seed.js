// SEED FILE
//   js file that saves things to your database when you run it
//   (make sonboarding easier and allows you to re-populate the DB
//    after you delete things)

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/ironshop');  // same as 'use ironshop'


const Product = require('../models/product-model.js');

const productInfoArray = [
  {
    name:'Phone Case',
    price:9.99,
    imageUrl:'https://media.giphy.com/media/euACplj3oGmiY/giphy.gif',
    description:'Protects your moile device'
  },
  {
    name:'Bean Bag',
    price:25,
    imageUrl:'https://media.giphy.com/media/3xz2Bsp47l53EqFAwo/giphy.gif',
    description:'So comfortable you can fall on it'
  },
  {
    name:'Tissues',
    price:13.70,
    imageUrl:'https://media.giphy.com/media/3o7TKsrfldgW9UXx60/giphy.gif',
    description:'Relieves symptoms of colds'
  },
  {
    name: 'Yoga Mat',
    price: 29.99,
    imageUrl: 'http://i.imgur.com/XtpFrW7.jpg',
    description: 'Keeps your knees safe, slip proof, sweat proof. Top of the line',
  },
  {
    name: '20" monitor',
    price: 249.99,
    imageUrl: 'http://i.imgur.com/5ICGeY0.jpg',
    description: 'Large enough for even the heaviest gamer. Crisp, fresh, no dead pixels guarantee',
  },
  {
    name: 'Soylent',
    price: 54.99,
    imageUrl: 'http://media.gq.com/photos/57c6f39209f7003c4afd2c4d/3:2/w_800/drink_gallery5.546e2142f4c6.jpg',
    description: 'You never have to leave your computer! All you can eat nutrition!',
  }
];

Product.create(productInfoArray, (err, productResults) => {
  if (err) {
    console.log('database error');
    return;
  }
    productResults.forEach((product) => {
      console.log("New product " + product.name );
    });
});
