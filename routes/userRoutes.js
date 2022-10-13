const express = require('express');
const {
  signup,
  login,
  forgetPassword,
  resetPassword,
} = require('../controllers/authController');

const {
  getAllUsers,
  createUsers,
  getUser,
  patchUser,
  deleteUser,
} = require('../controllers/userController');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/forgetpassword', forgetPassword);
router.post('/resetpassword', resetPassword);

router.route('/').get(getAllUsers).post(createUsers);

router.route('/:id').get(getUser).patch(patchUser).delete(deleteUser);

module.exports = router;
