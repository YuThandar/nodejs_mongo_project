const mongoose = require('mongoose');

// Create Schema

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour must have a name'],
    unique: true,
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  price: {
    type: Number,
    required: [true, 'A tour mush have a price'],
  },
});

// Create Model (also create a documents)
const Tour = mongoose.model('Tour', tourSchema); // model name Tour(model name start with capital letter) & schema

// const testTour = new Tour({
//   name: 'The Park Camper',
//   rating: 4.5,
//   price: 997,
// });

// testTour
//   .save()
//   .then((doc) => {
//     console.log(doc);
//   })
//   .catch((err) => {
//     console.log('ERROR 🔥:', err);
//   });

module.exports = Tour;
