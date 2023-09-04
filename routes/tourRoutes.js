const express = require('express');
const tourController = require('../controllers/tourController'); // get(tourController.getAllTours)

// const {
//   getAllTours,
//   createTour,
//   getTour,
//   updateTour,
//   deleteTour,
// } = require('../controllers/tourController');

const router = express.Router();

// Param Middleware

// router.param('id', (req, res, next, val) => {
//   console.log(`Tour id is: ${val}`);
// });

router.param('id', tourController.checkID);

router
  .route('/')
  .get(tourController.getAllTours)
  .post(tourController.createTour);

router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;
