import mongoose from 'mongoose'

const destinationSchema = new mongoose.Schema({
  city: { type: String, required: true, trim: true }, country: { type: String, required: true, trim: true },
  region: String, description: String, image: String, costIndex: { type: Number, min: 1, max: 5 }, popularity: { type: Number, min: 0 },
  tags: [String],
}, { timestamps: true })

destinationSchema.index({ city: 'text', country: 'text', tags: 'text' })
export default mongoose.model('Destination', destinationSchema)
