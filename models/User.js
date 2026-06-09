import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  age: { type: Number, default: 18 },
  createAt: { type: Date, default: Date.now }
})

export default mongoose.model('User', UserSchema)
