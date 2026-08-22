import 'dotenv/config'
import cors from 'cors'
import express from 'express'
import mongoose from 'mongoose'
import authRoutes from './routes/auth.js'
import tripRoutes from './routes/trips.js'
import discoveryRoutes from './routes/discovery.js'

const app = express()
const port = process.env.PORT || 5000

app.use(cors({ origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173' }))
app.use(express.json({ limit: '2mb' }))
app.get('/api/health', (_req, res) => res.json({ status: 'ok', service: 'globetrotter-api' }))
app.use('/api/auth', authRoutes)
app.use('/api/trips', tripRoutes)
app.use('/api/discover', discoveryRoutes)
app.use((error, _req, res, _next) => {
  console.error(error)
  res.status(error.status || 500).json({ message: error.message || 'Something went wrong.' })
})

async function start() {
  if (!process.env.MONGODB_URI) {
    console.warn('MONGODB_URI is not configured. API routes requiring data will be unavailable.')
  } else {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('Connected to MongoDB')
  }
  app.listen(port, () => console.log(`GlobeTrotter API running at http://localhost:${port}`))
}

start().catch(error => { console.error('Unable to start API', error); process.exit(1) })

export default app

