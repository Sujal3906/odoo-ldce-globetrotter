import { ArrowRight, CalendarDays, ChevronRight, CircleDollarSign, Compass, Map, Plus, Sparkles, TrendingUp } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { destinations } from '../data'
import { AvatarStack, DestinationCard, PageIntro, StatCard, TripCard } from '../components/UI'

export function Dashboard({ trips }) {
  const navigate = useNavigate()
  const activeTrip = trips.find(t => t.id === 'europe-2026') || trips[0]
  const upcoming = trips.filter(t => t.status !== 'Completed')
  return <>
    <PageIntro eyebrow="Friday, August 22" title="Good afternoon, Sujal." copy="Where would you like to wander next?" action={<button className="primary-button" onClick={() => navigate('/trips/new')}><Plus size={18} />Start planning</button>} />
    <section className="metrics-grid">
      <StatCard tone="coral" icon={<Map size={19} />} label="Countries explored" value="12" note="3 this year" />
      <StatCard tone="yellow" icon={<CalendarDays size={19} />} label="Days away" value="86" note="A lifetime of stories" />
      <StatCard tone="blue" icon={<CircleDollarSign size={19} />} label="Travel fund" value="$1,435" note="34% of your goal" />
      <StatCard tone="sage" icon={<TrendingUp size={19} />} label="Trips in the works" value={String(upcoming.length)} note="Your next escape awaits" />
    </section>
    <section className="dashboard-grid split-2">
      <div className="section-card upcoming-feature">
        <div className="section-head"><div><p className="eyebrow">Up next</p><h2>Ready for a little sun?</h2></div><button className="round-arrow" onClick={() => navigate(`/trip/${activeTrip.id}`)}><ArrowRight size={18} /></button></div>
        <div className="feature-trip"><img src={activeTrip.cover || activeTrip.image} alt="Lisbon skyline" /><div className="feature-trip-copy"><span className="trip-date-badge">14 - 23 SEP</span><h3>{activeTrip.name}</h3><p>Lisbon · Seville · Barcelona</p><div className="feature-details"><span>✦ 10 days</span><span>◌ 3 stops</span><AvatarStack /></div><button className="soft-button" onClick={() => navigate(`/itinerary/${activeTrip.id}`)}>View itinerary <ChevronRight size={16} /></button></div></div>
      </div>
      <div className="section-card pulse-card">
        <div className="section-head"><div><p className="eyebrow">Travel pulse</p><h2>A little nudge</h2></div><span className="pulse-icon"><Sparkles size={19} /></span></div>
        <div className="quote-mark">“</div><p className="pulse-copy">The loveliest places are often found when you leave room for the unplanned.</p><div className="pulse-bottom"><span>Thought for today</span><button onClick={() => navigate('/discover')}>Find inspiration <Compass size={16} /></button></div>
      </div>
    </section>
    <section className="section-block"><div className="section-head"><div><p className="eyebrow">Curated for you</p><h2>Dream a little bigger</h2></div><button className="text-button" onClick={() => navigate('/discover')}>Explore all <ArrowRight size={16} /></button></div><div className="destination-grid">{destinations.slice(0, 4).map(place => <DestinationCard key={place.id} place={place} onSelect={() => navigate('/discover')} />)}</div></section>
    <section className="section-block recent-section"><div className="section-head"><div><p className="eyebrow">From your passport</p><h2>Past adventures</h2></div><button className="text-button" onClick={() => navigate('/trips')}>See all trips <ArrowRight size={16} /></button></div><div className="trip-grid">{trips.filter(t => t.status === 'Completed').slice(0, 2).map(t => <TripCard key={t.id} trip={t} />)}</div></section>
  </>
}
