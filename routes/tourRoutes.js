const express = require('express');
const tourController = require('../controllers/tourController'); // get(tourController.getAllTours)
const authController = require('./../controllers/authController');

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

// router.param('id', tourController.checkID);

router
  .route('/top-5-cheap')
  .get(tourController.aliasTopTours, tourController.getAllTours);

router.route('/tour-stats').get(tourController.getTourStats);
router.route('/monthly-plan/:year').get(tourController.getMonthlyPlan);

router
  .route('/')
  .get(authController.protect, tourController.getAllTours)
  .post(tourController.createTour);
// .post(tourController.checkBody, tourController.createTour);

router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;
