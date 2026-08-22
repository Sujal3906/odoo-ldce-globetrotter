import mongoose from 'mongoose'

const activitySchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true }, city: String, category: String,
  startTime: String, duration: String, price: { type: Number, min: 0, default: 0 }, image: String,
}, { _id: true })

const stopSchema = new mongoose.Schema({
  city: { type: String, required: true, trim: true }, country: String, image: String,
  startDate: Date, endDate: Date, nights: { type: Number, min: 0, default: 0 }, order: { type: Number, required: true },
  activities: [activitySchema],
}, { _id: true })

const expenseSchema = new mongoose.Schema({
  category: { type: String, enum: ['stay', 'transport', 'food', 'activities', 'other'], required: true },
  label: { type: String, required: true, trim: true }, amount: { type: Number, min: 0, required: true },
  dueDate: Date, paid: { type: Boolean, default: false },
}, { timestamps: true })

const tripSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  name: { type: String, required: true, trim: true, maxlength: 120 }, description: { type: String, default: '', maxlength: 1000 },
  coverUrl: { type: String, default: '' }, startDate: { type: Date, required: true }, endDate: { type: Date, required: true },
  travelers: { type: Number, min: 1, default: 1 }, budget: { type: Number, min: 0, default: 0 },
  visibility: { type: String, enum: ['Private', 'Friends', 'Public'], default: 'Private' },
  stops: [stopSchema], expenses: [expenseSchema],
}, { timestamps: true })

tripSchema.index({ user: 1, startDate: -1 })
export default mongoose.model('Trip', tripSchema)

