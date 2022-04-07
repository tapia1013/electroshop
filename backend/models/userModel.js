import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false
  },
}, {
  timestamps: true
})

// Method to instantiate user, to use in userController
userSchema.methods.matchPassword = async function (enteredPassword) {
  // compare passwords with bcrypt
  return await bcrypt.compare(enteredPassword, this.password)
}

// encrypt password before we save below
userSchema.pre('save', async function (next) {
  // Only do this if password field is set
  if (!this.isModified('password')) {
    next();
  }

  // hash password with method in bcrypt
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

const User = mongoose.model('User', userSchema)

export default User