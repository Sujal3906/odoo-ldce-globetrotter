import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, maxlength: 80 },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  passwordHash: { type: String, required: true },
  homeBase: { type: String, default: '' },
  photoUrl: { type: String, default: '' },
  preferences: {
    travelStyle: { type: String, default: 'Slow & local' },
    reminders: { type: Boolean, default: true },
    communityActivity: { type: Boolean, default: true },
    weeklyInspiration: { type: Boolean, default: false },
  },
}, { timestamps: true })

export default mongoose.model('User', userSchema)

