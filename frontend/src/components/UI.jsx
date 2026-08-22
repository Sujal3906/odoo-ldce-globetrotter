import { ArrowUpRight, CalendarDays, MapPin, Star, Users } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export function PageIntro({ eyebrow, title, copy, action }) {
  return <section className="page-intro"><div><p className="eyebrow">{eyebrow}</p><h1>{title}</h1>{copy && <p className="intro-copy">{copy}</p>}</div>{action}</section>
}

export function StatCard({ icon, label, value, note, tone = 'sage' }) {
  return <div className={`stat-card tone-${tone}`}><div className="stat-icon">{icon}</div><p>{label}</p><strong>{value}</strong>{note && <span>{note}</span>}</div>
}

export function TripCard({ trip, large = false, onDelete }) {
  const navigate = useNavigate()
  return <article className={`trip-card ${large ? 'trip-card-large' : ''}`}>
    <div className="trip-image"><img src={trip.cover || trip.image} alt="" /><span className={`status-pill ${trip.status === 'Completed' ? 'soft' : ''}`}>{trip.status || 'Upcoming'}</span></div>
    <div className="trip-body"><div className="trip-heading"><div><h3>{trip.name}</h3><p><MapPin size={14} />{trip.location || trip.stops?.map(s => s.city).join(' · ')}</p></div>{onDelete && <button className="text-button danger" onClick={() => onDelete(trip.id)}>Delete</button>}</div><div className="trip-meta"><span><CalendarDays size={14} />{trip.dates || `${new Date(trip.startDate).toLocaleDateString('en', { month: 'short', day: 'numeric' })} - ${new Date(trip.endDate).toLocaleDateString('en', { month: 'short', day: 'numeric', year: 'numeric' })}`}</span><span><Users size={14} />{trip.travelers || 2} travelers</span></div><button className="card-link" onClick={() => navigate(`/trip/${trip.id}`)}>Open trip <ArrowUpRight size={16} /></button></div>
  </article>
}

export function DestinationCard({ place, compact = false, onSelect }) {
  return <article className={`destination-card ${compact ? 'destination-compact' : ''}`} onClick={onSelect}><img src={place.image} alt={`${place.city}, ${place.country}`} /><div className="destination-shade" /><div className="destination-copy"><div><h3>{place.city}</h3><p>{place.country}</p></div><span><Star size={13} fill="currentColor" />{place.rating}</span></div>{!compact && <div className="destination-bottom"><span>{place.tag}</span><em>{place.cost}</em></div>}</article>
}

export function AvatarStack() { return <div className="avatar-stack"><span className="avatar avatar-xs coral">M</span><span className="avatar avatar-xs blue">A</span><span className="avatar avatar-xs yellow">N</span><span className="avatar avatar-xs plus">+3</span></div> }
