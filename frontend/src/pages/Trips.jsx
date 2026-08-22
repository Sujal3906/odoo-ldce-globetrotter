import { CalendarDays, ChevronLeft, Clock3, Copy, Edit3, MapPin, Pencil, Plus, Route, Share2, Trash2, Users, X } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { destinations, initialTrip } from '../data'
import { DestinationCard, PageIntro, TripCard } from '../components/UI'

export function Trips({ trips, onDelete }) {
  const navigate = useNavigate()
  const [filter, setFilter] = useState('All')
  const [query, setQuery] = useState('')
  const visible = useMemo(() => trips.filter(t => (filter === 'All' || (filter === 'Upcoming' ? t.status !== 'Completed' : t.status === 'Completed')) && `${t.name} ${t.location || ''}`.toLowerCase().includes(query.toLowerCase())), [trips, filter, query])
  return <>
    <PageIntro eyebrow="Your passport" title="My trips" copy="Every escape, all in one place." action={<button className="primary-button" onClick={() => navigate('/trips/new')}><Plus size={18} />Plan a new trip</button>} />
    <section className="filter-row"><div className="segment-control">{['All', 'Upcoming', 'Completed'].map(label => <button onClick={() => setFilter(label)} className={filter === label ? 'active' : ''} key={label}>{label}</button>)}</div><label className="inline-search"><span>⌕</span><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search your trips" /></label></section>
    {visible.length ? <div className="trips-list">{visible.map((trip, i) => <div className="trip-list-item" key={trip.id}><span className="trip-number">{String(i + 1).padStart(2, '0')}</span><TripCard trip={trip} large onDelete={onDelete} /></div>)}</div> : <div className="empty-state"><span>✦</span><h2>Nothing here yet</h2><p>Try another search, or start sketching your next adventure.</p></div>}
  </>
}

export function TripEditor({ addTrip }) {
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', startDate: '', endDate: '', description: '', budget: '3000', cover: destinations[0].image })
  const update = (key, value) => setForm(f => ({ ...f, [key]: value }))
  const submit = (event) => { event.preventDefault(); if (!form.name || !form.startDate || !form.endDate) return; addTrip({ ...form, budget: Number(form.budget), location: 'Add your first destination' }); navigate('/trips') }
  return <div className="editor-shell">
    <button className="back-link" onClick={() => navigate('/trips')}><ChevronLeft size={18} />Back to trips</button>
    <div className="editor-head"><div><p className="eyebrow">New adventure</p><h1>Let’s map it out.</h1><p>Start with the essentials. You can fill in the beautiful details next.</p></div><span className="step-indicator"><b>1</b> of 2</span></div>
    <form className="trip-form" onSubmit={submit}>
      <div className="form-card"><h2>Trip basics</h2><p className="form-help">Give your adventure a name and a little context.</p><label>Trip name<input autoFocus value={form.name} onChange={e => update('name', e.target.value)} placeholder="e.g. Sunlit Iberian Escape" /></label><label>A note for this trip<textarea value={form.description} onChange={e => update('description', e.target.value)} placeholder="What are you hoping to feel, find, or taste?" rows="3" /></label><div className="field-grid"><label>Start date<input type="date" value={form.startDate} onChange={e => update('startDate', e.target.value)} /></label><label>End date<input type="date" value={form.endDate} onChange={e => update('endDate', e.target.value)} /></label></div><label>Comfortable total budget (USD)<div className="input-prefix"><span>$</span><input min="0" type="number" value={form.budget} onChange={e => update('budget', e.target.value)} /></div></label></div>
      <div className="form-card"><h2>Set the scene</h2><p className="form-help">Pick a cover that feels like the journey ahead.</p><div className="cover-picker">{destinations.slice(0, 4).map(place => <button type="button" className={form.cover === place.image ? 'selected' : ''} onClick={() => update('cover', place.image)} key={place.id}><img src={place.image} alt={place.city} /><span>{place.city}</span></button>)}</div></div>
      <div className="editor-actions"><button className="primary-button" type="submit">Create trip <Route size={18} /></button></div>
    </form>
  </div>
}

export function TripDetail({ trips, updateTrip }) {
  const navigate = useNavigate(); const { id } = useParams(); const [toast, setToast] = useState('')
  const trip = trips.find(item => item.id === id) || initialTrip
  const stops = trip.stops?.length ? trip.stops : [{ ...destinations[0], dates: 'Choose your dates', nights: 0, activities: [] }]
  const paidTotal = (trip.expenses || []).filter(expense => expense.paid).reduce((sum, expense) => sum + Number(expense.amount || 0), 0)
  const plannedTotal = (trip.expenses || []).reduce((sum, expense) => sum + Number(expense.amount || 0), 0)
  const share = async () => { try { await navigator.clipboard.writeText(`${window.location.origin}/trip/${trip.id}`); setToast('Share link copied to your clipboard') } catch { setToast('Share link is ready to copy from your browser address bar') } setTimeout(() => setToast(''), 2500) }
  return <>
    {toast && <div className="toast">✓ {toast}</div>}
    <section className="trip-hero"><img src={trip.cover || trip.image || destinations[0].image} alt="" /><div className="trip-hero-overlay" /><div className="trip-hero-content"><div className="hero-nav"><button onClick={() => navigate('/trips')}><ChevronLeft size={18} />All trips</button><div><button onClick={share}><Share2 size={17} />Share</button><button onClick={() => navigate(`/itinerary/${trip.id}`)}><Edit3 size={17} />Edit trip</button></div></div><div className="hero-trip-info"><span>UPCOMING GETAWAY</span><h1>{trip.name}</h1><p><CalendarDays size={16} />{trip.startDate ? `${new Date(trip.startDate).toLocaleDateString('en', { month: 'short', day: 'numeric' })} - ${new Date(trip.endDate).toLocaleDateString('en', { month: 'short', day: 'numeric', year: 'numeric' })}` : trip.dates} <i /> <Users size={16} />{trip.travelers || 2} travelers</p></div></div></section>
    <section className="trip-detail-grid"><div><div className="detail-section-head"><div><p className="eyebrow">Your route</p><h2>{stops.length} places, a thousand possibilities</h2></div><button className="text-button" onClick={() => navigate(`/itinerary/${trip.id}`)}><Pencil size={15} />Edit itinerary</button></div><div className="route-stops">{stops.map((stop, index) => <article className="route-stop" key={stop.id || stop.city}><div className="route-marker"><span>{index + 1}</span>{index < stops.length - 1 && <i />}</div><img src={stop.image || destinations[0].image} alt="" /><div className="route-copy"><p>{stop.dates}</p><h3>{stop.city}<small>{stop.country}</small></h3><span>{stop.nights || 0} nights · {stop.activities?.length || 0} plans saved</span></div></article>)}</div></div><aside className="trip-side-panel"><div className="side-budget"><div className="small-ring"><span>{Math.round((paidTotal / (trip.budget || 1)) * 100)}%</span></div><div><p>Trip budget</p><h3>${paidTotal.toLocaleString()} <small>paid of ${(trip.budget || 0).toLocaleString()}</small></h3><span>${plannedTotal.toLocaleString()} planned in total.</span></div></div><button className="wide-button" onClick={() => navigate('/budget')}>See cost breakdown <ArrowIcon /></button><hr /><p className="panel-label">TRIP DETAILS</p><dl><div><dt>Visibility</dt><dd>{trip.visibility || 'Friends'}</dd></div><div><dt>Travel style</dt><dd>Slow & local</dd></div><div><dt>Companions</dt><dd>{trip.travelers || 2} travelers</dd></div></dl><button className="panel-share" onClick={share}><Copy size={16} />Copy share link</button></aside></section>
  </>
}

function ArrowIcon() { return <span aria-hidden="true">↗</span> }
