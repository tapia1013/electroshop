import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';


// @desc     Auth user & get token
// @route    POST /api/users/login
// @access   Public
const authUser = asyncHandler(async (req, res) => {
  // Get form data from form
  const { email, password } = req.body

  // Find user
  const user = await User.findOne({ email: email })

  // Check if user exists, we get user.matchPW from userModel Schema
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: null
    })
  } else {
    res.status(401)
    throw new Error('Invalid Email or Password')
  }
})

export {
  authUser
}