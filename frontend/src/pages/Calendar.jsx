import { ArrowRight, CalendarDays, ChevronLeft, ChevronRight, Plus } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { tripDates } from '../data'
import { PageIntro } from '../components/UI'

const toDate = value => value ? new Date(`${value}T12:00:00`) : null
const toDateKey = date => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`

function getCalendarEvents(trips) {
  return trips.flatMap(trip => {
    if (trip.id === 'europe-2026') return tripDates.map(item => ({ id: `iberia-${item.day}`, date: `2026-09-${item.day}`, city: item.city, label: item.label, kind: item.kind, tripId: trip.id }))
    const startDate = toDate(trip.startDate)
    const endDate = toDate(trip.endDate)
    if (!startDate || Number.isNaN(startDate.valueOf())) return []
    const city = trip.stops?.[0]?.city || trip.location?.split(',')[0] || 'Your trip'
    const events = [{ id: `${trip.id}-start`, date: toDateKey(startDate), city, label: `${trip.name} begins`, kind: 'travel', tripId: trip.id }]
    if (endDate && !Number.isNaN(endDate.valueOf()) && toDateKey(endDate) !== toDateKey(startDate)) events.push({ id: `${trip.id}-end`, date: toDateKey(endDate), city, label: `${trip.name} ends`, kind: 'travel', tripId: trip.id })
    return events
  })
}

export function CalendarView({ trips }) {
  const navigate = useNavigate()
  const [displayMonth, setDisplayMonth] = useState(() => new Date(2026, 8, 1))
  const [selectedEvent, setSelectedEvent] = useState(null)
  const events = useMemo(() => getCalendarEvents(trips), [trips])
  const eventsByDate = useMemo(() => events.reduce((map, event) => ({ ...map, [event.date]: [...(map[event.date] || []), event] }), {}), [events])
  const monthIndex = displayMonth.getMonth()
  const year = displayMonth.getFullYear()
  const monthName = displayMonth.toLocaleString('en', { month: 'long' })
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate()
  const firstMondayOffset = (new Date(year, monthIndex, 1).getDay() + 6) % 7
  const cells = Array.from({ length: Math.ceil((firstMondayOffset + daysInMonth) / 7) * 7 }, (_, index) => { const day = index - firstMondayOffset + 1; return day > 0 && day <= daysInMonth ? day : null })
  const changeMonth = delta => { setDisplayMonth(current => new Date(current.getFullYear(), current.getMonth() + delta, 1)); setSelectedEvent(null) }
  const chooseMonth = event => { setDisplayMonth(current => new Date(current.getFullYear(), Number(event.target.value), 1)); setSelectedEvent(null) }

  return <><PageIntro eyebrow="Your calendar" title={`${monthName}, at a glance.`} copy="Every new trip appears automatically on its start and end dates." action={<div className="calendar-controls"><button className="icon-button" onClick={() => changeMonth(-1)} aria-label="Previous month"><ChevronLeft size={18} /></button><select value={monthIndex} onChange={chooseMonth} aria-label="Select month">{Array.from({ length: 12 }, (_, index) => <option value={index} key={index}>{new Date(year, index, 1).toLocaleString('en', { month: 'long' })}</option>)}</select><button className="icon-button" onClick={() => changeMonth(1)} aria-label="Next month"><ChevronRight size={18} /></button></div>} /><section className="calendar-layout"><div className="section-card calendar-card"><div className="calendar-head"><button className="icon-button" onClick={() => changeMonth(-1)} aria-label="Previous month"><ChevronLeft size={18} /></button><h2>{monthName} {year}</h2><button className="icon-button" onClick={() => changeMonth(1)} aria-label="Next month"><ChevronRight size={18} /></button></div><div className="week-labels">{['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => <span key={day}>{day}</span>)}</div><div className="calendar-cells">{cells.map((day, index) => { const key = day ? toDateKey(new Date(year, monthIndex, day)) : ''; const dayEvents = eventsByDate[key] || []; return <div className={`${day ? '' : 'outside'} ${dayEvents[0] ? `has-event ${dayEvents[0].kind}` : ''} ${dayEvents.some(event => event.id === selectedEvent?.id) ? 'selected-day' : ''}`} key={`${year}-${monthIndex}-${index}`}>{day && <strong>{day}</strong>}{dayEvents.slice(0, 1).map(event => <button onClick={() => setSelectedEvent(event)} key={event.id}><small>{event.city}</small><span>{event.label}</span></button>)}{dayEvents.length > 1 && <button className="more-events" onClick={() => setSelectedEvent(dayEvents[1])}>+{dayEvents.length - 1} more</button>}</div> })}</div></div><aside className="calendar-side">{selectedEvent ? <SelectedEvent event={selectedEvent} onOpen={() => navigate(`/trip/${selectedEvent.tripId}`)} /> : <div className="calendar-empty"><CalendarDays size={24} /><p className="eyebrow">{monthName} {year}</p><h2>Open skies ahead.</h2><p>There are no selected plans. Choose an event, or create a new trip and it will appear here automatically.</p><button className="wide-button" onClick={() => navigate('/trips/new')}>Plan a trip <Plus size={16} /></button></div>}</aside></section></>
}

function SelectedEvent({ event, onOpen }) { return <><div className="side-date"><span>{new Date(`${event.date}T12:00:00`).toLocaleString('en', { weekday: 'short' }).toUpperCase()}</span><strong>{new Date(`${event.date}T12:00:00`).getDate()}</strong><small>{new Date(`${event.date}T12:00:00`).toLocaleString('en', { month: 'long' })}</small></div><p className="eyebrow">{event.city} itinerary</p><h2>{event.label}</h2><p className="calendar-side-copy">{event.kind === 'travel' ? 'A travel day with room to settle in, find your bearings, and enjoy the beginning of something new.' : 'A thoughtfully paced day, with enough space for a detour that feels just right.'}</p><div className="day-agenda"><AgendaItem time="08:15" icon="✦" title={event.label} copy={`${event.city} · your saved plan`} /><AgendaItem time="14:00" icon="☀️" title="Leave room to wander" copy="A flexible afternoon" /></div><button className="wide-button" onClick={onOpen}>Open trip <ArrowRight size={16} /></button></> }
function AgendaItem({ time, icon, title, copy }) { return <div className="agenda-item"><strong>{time}</strong><span>{icon}</span><div><h4>{title}</h4><p>{copy}</p></div></div> }
