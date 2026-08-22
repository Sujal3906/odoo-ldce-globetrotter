import { Router } from 'express'
import Destination from '../models/Destination.js'

const router = Router()

router.get('/destinations', async (req, res, next) => {
  try {
    const { q = '', country, limit = 20 } = req.query
    const filter = {}
    if (country) filter.country = new RegExp(`^${escapeExpression(country)}$`, 'i')
    if (q.trim()) filter.$text = { $search: q.trim() }
    const destinations = await Destination.find(filter).sort(q.trim() ? { score: { $meta: 'textScore' } } : { popularity: -1 }).limit(Math.min(Number(limit) || 20, 50))
    return res.json({ destinations })
  } catch (error) { return next(error) }
})

function escapeExpression(value) { return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') }
export default router

