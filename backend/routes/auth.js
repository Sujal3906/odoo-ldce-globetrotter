import { Router } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'
import { requireAuth } from '../middleware/auth.js'

const router = Router()
const publicUser = user => ({ id: user.id, name: user.name, email: user.email, homeBase: user.homeBase, photoUrl: user.photoUrl, preferences: user.preferences })
const issueToken = user => jwt.sign({ sub: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' })

router.post('/signup', async (req, res, next) => {
  try {
    const { name, email, password } = req.body
    if (!name?.trim() || !email?.trim() || !password || password.length < 8) return res.status(400).json({ message: 'Name, email, and a password of at least 8 characters are required.' })
    const existing = await User.findOne({ email: email.toLowerCase() })
    if (existing) return res.status(409).json({ message: 'An account with this email already exists.' })
    const user = await User.create({ name: name.trim(), email: email.toLowerCase(), passwordHash: await bcrypt.hash(password, 12) })
    return res.status(201).json({ token: issueToken(user), user: publicUser(user) })
  } catch (error) { return next(error) }
})

router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email: email?.toLowerCase() })
    if (!user || !(await bcrypt.compare(password || '', user.passwordHash))) return res.status(401).json({ message: 'Email or password is incorrect.' })
    return res.json({ token: issueToken(user), user: publicUser(user) })
  } catch (error) { return next(error) }
})

router.get('/me', requireAuth, async (req, res, next) => {
  try {
    const user = await User.findById(req.userId)
    if (!user) return res.status(404).json({ message: 'User not found.' })
    return res.json({ user: publicUser(user) })
  } catch (error) { return next(error) }
})

router.patch('/me', requireAuth, async (req, res, next) => {
  try {
    const allowed = ['name', 'homeBase', 'photoUrl', 'preferences']
    const update = Object.fromEntries(Object.entries(req.body).filter(([key]) => allowed.includes(key)))
    const user = await User.findByIdAndUpdate(req.userId, update, { new: true, runValidators: true })
    return res.json({ user: publicUser(user) })
  } catch (error) { return next(error) }
})

export default router

