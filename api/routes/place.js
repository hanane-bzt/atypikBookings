const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../middlewares/user');
const {
  addPlace,
  getPlaces,
  updatePlace,
  singlePlace,
  userPlaces,
  searchPlaces,
  addReview,
  getReviewsByPlace,
  replyToReview,
} = require('../controllers/placeController');

// Public route
router.route('/').get(getPlaces);

// Protected
router.route('/add-places').post(isLoggedIn, addPlace);
router.route('/user-places').get(isLoggedIn, userPlaces);
router.route('/update-place').put(isLoggedIn, updatePlace);

// Reviews
router.post('/:placeId/reviews', isLoggedIn, addReview);
router.get('/:placeId/reviews', getReviewsByPlace);
router.post('/:placeId/reviews/:reviewId/reply', isLoggedIn, replyToReview);

// Public
router.route('/:id').get(singlePlace);
router.route('/search/:key').get(searchPlaces);

module.exports = router;
