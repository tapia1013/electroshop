/**
 * 
 * MIDDLEWARE FOR VALIDATING TOKEN
 * 
 *   - Token is sent through headers as a Bearer Token
 * 
 */
import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Check if authentication starts with 'Bearer'
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {

    try {
      token = req.headers.authorization.split(' ')[1]

      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      // console.log(decoded.id);

      // fetch user with decoded, minus password just user
      req.user = await User.findById(decoded.id).select('-password')


    } catch (error) {
      console.error(error);
      res.status(401)
      throw new Error('Not authorized, token failed')
    }

  }

  // if no token
  if (!token) {
    res.status(401)
    throw new Error('Not Authorized, no token')
  }

  next();
})


export { protect }
