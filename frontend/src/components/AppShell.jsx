import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { CalendarDays, ChevronDown, Compass, LayoutDashboard, LogOut, Map, Menu, Plus, Settings, UsersRound, WalletCards, X } from 'lucide-react'
import { useState } from 'react'

const navItems = [
  { to: '/', label: 'Overview', icon: LayoutDashboard },
  { to: '/trips', label: 'My trips', icon: Map },
  { to: '/discover', label: 'Discover', icon: Compass },
  { to: '/calendar', label: 'Calendar', icon: CalendarDays },
  { to: '/budget', label: 'Budget', icon: WalletCards },
]

export function AppShell({ children, user, onLogout }) {
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const isPlanner = location.pathname.includes('itinerary') || location.pathname.includes('trip/')

  return <div className="app-frame">
    <aside className={`sidebar ${open ? 'is-open' : ''}`}>
      <button className="mobile-close icon-button" onClick={() => setOpen(false)} aria-label="Close navigation"><X size={20} /></button>
      <NavLink className="brand" to="/" onClick={() => setOpen(false)}>
        <span className="brand-mark">G</span><span>GlobeTrotter</span>
      </NavLink>
      <div className="sidebar-label">Plan</div>
      <nav className="main-nav">
        {navItems.map(({ to, label, icon: Icon }) => <NavLink key={to} end={to === '/'} to={to} onClick={() => setOpen(false)} className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}><Icon size={19} /><span>{label}</span></NavLink>)}
      </nav>
      <div className="sidebar-label">Connect</div>
      <nav className="main-nav">
        <NavLink to="/community" onClick={() => setOpen(false)} className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}><UsersRound size={19} /><span>Community</span></NavLink>
      </nav>
      <div className="sidebar-spacer" />
      <div className="travel-note"><span className="sparkle">✦</span><div><strong>Make space for wonder.</strong><p>Your next great story starts here.</p></div></div>
      <NavLink to="/settings" onClick={() => setOpen(false)} className={({ isActive }) => `nav-link settings-link ${isActive ? 'active' : ''}`}><Settings size={19} /><span>Settings</span></NavLink>
      <div className="profile-mini"><div className="avatar avatar-s">{user?.name?.slice(0, 1) || 'S'}</div><div><strong>{user?.name || 'Sujal Shah'}</strong><small>Explorer</small></div><ChevronDown size={16} /><button type="button" className="icon-button muted" onClick={onLogout} aria-label="Log out"><LogOut size={14} /></button></div>
    </aside>
    {open && <div className="nav-scrim" onClick={() => setOpen(false)} />}
    <main className="main-content">
      <header className="topbar">
        <button className="menu-button icon-button" onClick={() => setOpen(true)} aria-label="Open navigation"><Menu size={21} /></button>
        <div className="crumb"><span>{isPlanner ? 'My trips' : 'GlobeTrotter'}</span>{isPlanner && <><span className="crumb-divider">/</span><strong>Sunlit Iberian Escape</strong></>}</div>
        <div className="top-actions"><button className="new-trip-button" onClick={() => navigate('/trips/new')}><Plus size={17} />Plan a trip</button></div>
      </header>
      <div className="page-content">{children}</div>
    </main>
  </div>
}
