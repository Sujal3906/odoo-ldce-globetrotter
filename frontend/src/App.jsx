import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { AppShell } from './components/AppShell'
import { initialTrip, previousTrips } from './data'
import { Dashboard } from './pages/Dashboard'
import { Trips, TripEditor, TripDetail } from './pages/Trips'
import { Builder, Community, Discover, Settings, Auth } from './pages/Planner'
import { Budget } from './pages/Budget'
import { CalendarView } from './pages/Calendar'

const getStoredTrips = () => {
  try {
    const savedTrips = JSON.parse(localStorage.getItem('gt-trips'))
    if (!savedTrips) return [initialTrip, ...previousTrips]
    return savedTrips.map(trip => trip.id === initialTrip.id && !Array.isArray(trip.expenses) ? { ...trip, expenses: initialTrip.expenses } : trip)
  } catch { return [initialTrip, ...previousTrips] }
}

export default function App() {
  const [trips, setTrips] = useState(getStoredTrips)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('gt-user')) || { name: 'Sujal Shah', email: 'sujal@example.com', city: 'Pune, India' } } catch { return { name: 'Sujal Shah', email: 'sujal@example.com', city: 'Pune, India' } }
  })
  const location = useLocation()

  useEffect(() => { localStorage.setItem('gt-trips', JSON.stringify(trips)) }, [trips])
  useEffect(() => { localStorage.setItem('gt-user', JSON.stringify(user)) }, [user])
  const addTrip = (trip) => setTrips(current => [{ ...trip, id: `trip-${Date.now()}`, status: 'Upcoming', travelers: 2, stops: [], expenses: [] }, ...current])
  const updateTrip = (id, updates) => setTrips(current => current.map(t => t.id === id ? { ...t, ...updates } : t))
  const deleteTrip = (id) => setTrips(current => current.filter(t => t.id !== id))
  const authenticate = () => { localStorage.setItem('gt-session', 'true'); setIsAuthenticated(true) }
  const logout = () => { localStorage.removeItem('gt-session'); setIsAuthenticated(false) }

  if (location.pathname === '/login' || location.pathname === '/signup') {
    return <Auth setUser={setUser} onAuthenticated={authenticate} initialMode={location.pathname === '/signup' ? 'signup' : 'login'} />
  }
  if (!isAuthenticated) return <Navigate to="/login" replace />
  return <AppShell user={user} onLogout={logout}><Routes>
    <Route path="/" element={<Dashboard trips={trips} />} />
    <Route path="/trips" element={<Trips trips={trips} onDelete={deleteTrip} />} />
    <Route path="/trips/new" element={<TripEditor addTrip={addTrip} />} />
    <Route path="/trip/:id" element={<TripDetail trips={trips} updateTrip={updateTrip} />} />
    <Route path="/itinerary/:id" element={<Builder trips={trips} updateTrip={updateTrip} />} />
    <Route path="/discover" element={<Discover />} />
    <Route path="/budget" element={<Budget trips={trips} updateTrip={updateTrip} />} />
    <Route path="/calendar" element={<CalendarView trips={trips} />} />
    <Route path="/community" element={<Community />} />
    <Route path="/settings" element={<Settings user={user} setUser={setUser} />} />
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes></AppShell>
}
