import asyncHandler from 'express-async-handler';
import generateToken from '../utils/generateToken.js';
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
      token: generateToken(user._id)
    })
  } else {
    res.status(401)
    throw new Error('Invalid Email or Password')
  }
})




// @desc     Register a new user
// @route    POST /api/users
// @access   Public
const registerUser = asyncHandler(async (req, res) => {
  // Get form data from form
  const { name, email, password } = req.body

  const userExists = await User.findOne({ email })

  if (userExists) {
    res.status(400);
    throw new Error('User already exists!')
  }

  const user = await User.create({
    name,
    email,
    password
  })

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id)
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data!')
  }

})


// @desc      Get user profile
// @route     GET /api/users/profile
// @access    Private
const getUserProfile = asyncHandler(async (req, res) => {
  // get the user
  const user = await User.findById(req.user._id)

  // check for the user
  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin
    })
  } else {
    res.status(404);
    throw new Error('User not found')
  }
})




// @desc     Update user profile
// @route    PUT /api/users/profile
// @access   Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)
  // console.log(user);


  if (user) {
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    // check to see if password was sent
    if (req.body.password) {
      user.password = req.body.password
    }

    const updatedUser = await user.save()

    return res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    })

  } else {
    res.status(404);
    throw new Error('UserUpdate not found!')
  }

})




export {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile
}