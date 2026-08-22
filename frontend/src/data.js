export const destinations = [
  { id: 'lisbon', city: 'Lisbon', country: 'Portugal', tag: 'Coastal culture', cost: '$$', rating: '4.9', image: 'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?auto=format&fit=crop&w=900&q=85', accent: '#d86c54' },
  { id: 'kyoto', city: 'Kyoto', country: 'Japan', tag: 'Quiet wonder', cost: '$$$', rating: '4.9', image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=900&q=85', accent: '#a96957' },
  { id: 'reykjavik', city: 'Reykjavik', country: 'Iceland', tag: 'Wild horizons', cost: '$$$', rating: '4.8', image: 'https://images.unsplash.com/photo-1504829857797-ddff29c27927?auto=format&fit=crop&w=900&q=85', accent: '#5c99ac' },
  { id: 'marrakesh', city: 'Marrakesh', country: 'Morocco', tag: 'Colour & craft', cost: '$', rating: '4.8', image: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=900&q=85', accent: '#bd7b37' },
  { id: 'amsterdam', city: 'Amsterdam', country: 'Netherlands', tag: 'Canals & cafés', cost: '$$$', rating: '4.8', image: 'https://images.unsplash.com/photo-1534351590666-13e3e96b5017?auto=format&fit=crop&w=900&q=85', accent: '#6c856a' },
  { id: 'copenhagen', city: 'Copenhagen', country: 'Denmark', tag: 'Design-forward', cost: '$$$', rating: '4.7', image: 'https://images.unsplash.com/photo-1513622470522-26c3c8a854bc?auto=format&fit=crop&w=900&q=85', accent: '#7b9eab' },
]

export const activities = [
  { id: 'pasteis', title: 'Pastéis de Belém baking class', city: 'Lisbon', category: 'Food & drink', time: '09:30', duration: '2 hrs', price: 42, rating: 4.9, image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=900&q=85', icon: '🍮' },
  { id: 'tram', title: 'Golden hour Tram 28 ride', city: 'Lisbon', category: 'Sightseeing', time: '16:30', duration: '1 hr', price: 4, rating: 4.8, image: 'https://images.unsplash.com/photo-1558980394-0c7a1c67b3e6?auto=format&fit=crop&w=900&q=85', icon: '🚋' },
  { id: 'sintra', title: 'Sintra palaces day escape', city: 'Lisbon', category: 'Outdoors', time: '08:15', duration: '8 hrs', price: 71, rating: 4.9, image: 'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?auto=format&fit=crop&w=900&q=85', icon: '🏰' },
  { id: 'fado', title: 'Intimate Fado dinner', city: 'Lisbon', category: 'Culture', time: '20:00', duration: '2 hrs', price: 58, rating: 4.7, image: 'https://images.unsplash.com/photo-1529260830199-42c24126f198?auto=format&fit=crop&w=900&q=85', icon: '🎶' },
  { id: 'tea', title: 'Traditional tea ceremony', city: 'Kyoto', category: 'Culture', time: '10:00', duration: '1.5 hrs', price: 35, rating: 4.9, image: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?auto=format&fit=crop&w=900&q=85', icon: '🍵' },
  { id: 'bikes', title: 'Canal-side bike picnic', city: 'Amsterdam', category: 'Outdoors', time: '12:00', duration: '3 hrs', price: 28, rating: 4.8, image: 'https://images.unsplash.com/photo-1534351590666-13e3e96b5017?auto=format&fit=crop&w=900&q=85', icon: '🚲' },
]

export const initialTrip = {
  id: 'europe-2026', name: 'Sunlit Iberian Escape', cover: destinations[0].image,
  startDate: '2026-09-14', endDate: '2026-09-23', description: 'A slow, sun-soaked journey through Portugal and Spain.',
  travelers: 2, budget: 4200, visibility: 'Friends',
  expenses: [
    { id: 'expense-stay', category: 'stay', label: 'Hotel Casa do Mercado', amount: 1060, dueDate: '2026-09-01', paid: true },
    { id: 'expense-transport', category: 'transport', label: 'Flights and rail tickets', amount: 765, dueDate: '2026-08-30', paid: true },
    { id: 'expense-food', category: 'food', label: 'Food & drink allowance', amount: 545, dueDate: '2026-09-12', paid: true },
    { id: 'expense-activities', category: 'activities', label: 'Experiences & entries', amount: 395, dueDate: '2026-09-08', paid: false },
  ],
  stops: [
    { id: 'stop-lisbon', city: 'Lisbon', country: 'Portugal', dates: 'Sep 14 - 18', nights: 4, image: destinations[0].image, activities: [activities[0], activities[1], activities[3]] },
    { id: 'stop-seville', city: 'Seville', country: 'Spain', dates: 'Sep 18 - 21', nights: 3, image: 'https://images.unsplash.com/photo-1558642084-fd07fae5282e?auto=format&fit=crop&w=900&q=85', activities: [] },
    { id: 'stop-barcelona', city: 'Barcelona', country: 'Spain', dates: 'Sep 21 - 23', nights: 2, image: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?auto=format&fit=crop&w=900&q=85', activities: [] },
  ],
}

export const previousTrips = [
  { id: 'tokyo', name: 'Neon & Nature', location: 'Tokyo, Japan', dates: 'Apr 02 - 11, 2026', image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=900&q=85', days: 10, status: 'Completed' },
  { id: 'italy', name: 'A Taste of Italy', location: 'Rome, Florence & Milan', dates: 'Oct 04 - 14, 2025', image: 'https://images.unsplash.com/photo-1529260830199-42c24126f198?auto=format&fit=crop&w=900&q=85', days: 11, status: 'Completed' },
]

export const communityTrips = [
  { author: 'Maya Chen', handle: '@mayawanders', title: 'Slow mornings in Lisbon', copy: 'A 4-day edit of tiled lanes, tiny wine bars and the very best sunset viewpoints.', saves: 824, image: destinations[0].image, tags: ['Lisbon', '4 days', 'Culture'] },
  { author: 'Darren Miles', handle: '@milesaway', title: 'Iceland in winter', copy: 'A practical route for waterfalls, hot springs and catching the northern lights.', saves: 615, image: destinations[2].image, tags: ['Iceland', '7 days', 'Outdoors'] },
  { author: 'Nora Patel', handle: '@noratravels', title: 'Kyoto after dark', copy: 'Temples, lantern-lit alleys, and a food-first itinerary for a long weekend.', saves: 491, image: destinations[1].image, tags: ['Kyoto', '3 days', 'Food'] },
]

export const tripDates = [
  { day: '14', dow: 'Mon', city: 'Lisbon', label: 'Arrive in Lisbon', kind: 'travel' },
  { day: '15', dow: 'Tue', city: 'Lisbon', label: 'Pastéis baking class', kind: 'activity' },
  { day: '16', dow: 'Wed', city: 'Lisbon', label: 'Golden hour tram ride', kind: 'activity' },
  { day: '17', dow: 'Thu', city: 'Lisbon', label: 'Sintra day escape', kind: 'activity' },
  { day: '18', dow: 'Fri', city: 'Seville', label: 'Train to Seville', kind: 'travel' },
  { day: '19', dow: 'Sat', city: 'Seville', label: 'Alcázar & tapas crawl', kind: 'activity' },
  { day: '20', dow: 'Sun', city: 'Seville', label: 'Free day', kind: 'free' },
  { day: '21', dow: 'Mon', city: 'Barcelona', label: 'Train to Barcelona', kind: 'travel' },
]
