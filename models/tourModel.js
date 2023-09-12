const mongoose = require('mongoose');

// Create Schema

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour must have a name'],
    unique: true,
    trim: true,
  },
  duration: {
    type: Number,
    required: [true, 'A tour mush have a duration'],
  },
  maxGroupSize: {
    type: Number,
    required: [true, 'A tour mush have a group size'],
  },
  difficulty: {
    type: String,
    required: [true, 'A tour mush have a difficulty'],
  },
  ratingAverage: {
    type: Number,
    default: 4.5,
  },
  ratingQuantity: {
    type: Number,
    default: 0,
  },
  price: {
    type: Number,
    required: [true, 'A tour mush have a price'],
  },
  priceDiscount: Number,
  summary: {
    type: String,
    trim: true,
    required: [true, 'A tour mush have a summary'],
  },
  description: {
    type: String,
    trim: true,
  },
  imageCover: {
    type: String,
    required: [true, 'A tour must have a cover image'],
  },
  images: [String],
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false, // this field permantly hide
  },
  startDates: [Date],
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
