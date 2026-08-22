import { Router } from 'express'
import Trip from '../models/Trip.js'
import { requireAuth } from '../middleware/auth.js'

const router = Router()
router.use(requireAuth)

function validateDates(trip) {
  return !trip.startDate || !trip.endDate || new Date(trip.endDate) < new Date(trip.startDate)
}

router.get('/', async (req, res, next) => {
  try {
    const trips = await Trip.find({ user: req.userId }).sort({ startDate: -1 })
    return res.json({ trips })
  } catch (error) { return next(error) }
})

router.post('/', async (req, res, next) => {
  try {
    if (!req.body.name?.trim() || validateDates(req.body)) return res.status(400).json({ message: 'A name and a valid start/end date are required.' })
    const trip = await Trip.create({ ...req.body, user: req.userId })
    return res.status(201).json({ trip })
  } catch (error) { return next(error) }
})

router.get('/:tripId', async (req, res, next) => {
  try {
    const trip = await Trip.findOne({ _id: req.params.tripId, user: req.userId })
    if (!trip) return res.status(404).json({ message: 'Trip not found.' })
    return res.json({ trip })
  } catch (error) { return next(error) }
})

router.patch('/:tripId', async (req, res, next) => {
  try {
    if ((req.body.startDate || req.body.endDate) && validateDates(req.body)) return res.status(400).json({ message: 'End date must follow start date.' })
    const trip = await Trip.findOneAndUpdate({ _id: req.params.tripId, user: req.userId }, req.body, { new: true, runValidators: true })
    if (!trip) return res.status(404).json({ message: 'Trip not found.' })
    return res.json({ trip })
  } catch (error) { return next(error) }
})

router.delete('/:tripId', async (req, res, next) => {
  try {
    const result = await Trip.deleteOne({ _id: req.params.tripId, user: req.userId })
    if (!result.deletedCount) return res.status(404).json({ message: 'Trip not found.' })
    return res.status(204).end()
  } catch (error) { return next(error) }
})

router.post('/:tripId/expenses', async (req, res, next) => {
  try {
    const { category, label, amount, dueDate } = req.body
    if (!category || !label?.trim() || Number(amount) < 0) return res.status(400).json({ message: 'An expense category, label, and non-negative amount are required.' })
    const trip = await Trip.findOne({ _id: req.params.tripId, user: req.userId })
    if (!trip) return res.status(404).json({ message: 'Trip not found.' })
    trip.expenses.push({ category, label: label.trim(), amount: Number(amount), dueDate })
    await trip.save()
    return res.status(201).json({ trip })
  } catch (error) { return next(error) }
})

export default router

