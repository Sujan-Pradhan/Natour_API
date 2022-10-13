const express = require('express');
const { protect, restrictTo } = require('../controllers/authController');
const {
  // checkID,
  // checkBody,
  getAllTours,
  createTours,
  getTours,
  patchTours,
  deleteTours,
  aliasTopTour,
  getTourStats,
  getMonthlyPlan,
  test,
} = require('../controllers/tourController');
const router = express.Router();

router.get('/test', test);
// router.param('id', checkID);
router.route('/top-5-tours').get(aliasTopTour, getAllTours);

router.route('/tour-stats').get(getTourStats);
router.route('/monthly-plan/:year').get(getMonthlyPlan);

router.route('/').get(protect, getAllTours).post(createTours);

router
  .route('/:id')
  .get(getTours)
  .patch(patchTours)
  .delete(protect, restrictTo, deleteTours);

module.exports = router;
