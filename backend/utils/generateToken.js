import jwt from 'jsonwebtoken';


// Id = payload of token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '9999999999999d'
  })
}

export default generateToken;