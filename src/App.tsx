import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useParams, useNavigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { CottageProvider, useCottages } from './contexts/CottageContext';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import CottageCard from './components/CottageCard';
import { Cottage } from './types';
import { Calendar, Trash2, Edit3, CheckCircle } from 'lucide-react';

const HomePage: React.FC = () => {
  const { user } = useAuth();
  const { cottages } = useCottages();

  const featured = cottages.slice(0, 3);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero */}
      <div className="relative h-screen flex items-center justify-center overflow-hidden bg-[radial-gradient(#0ea5e9_0.8px,transparent_1px)] bg-[length:30px_30px]">
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/70"></div>
        
        <div className="relative z-10 text-center px-6 max-w-4xl">
          <div className="inline-flex items-center gap-2 bg-white/90 text-teal-800 text-xs tracking-[2px] px-6 py-3 rounded-3xl mb-6">🌊 ISSYK-KUL • KYRGYZSTAN</div>
          
          <h1 className="text-7xl md:text-[92px] font-semibold text-white tracking-tighter leading-none mb-6">
            YOUR LAKE<br />ESCAPE AWAITS
          </h1>
          <p className="max-w-md mx-auto text-xl text-white/80 mb-10">
            Handpicked cottages and villas on the shores of the majestic Issyk-Kul. 
            Book your perfect mountain lake getaway.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#explore" 
               onClick={(e) => { e.preventDefault(); document.getElementById('explore')?.scrollIntoView({ behavior: 'smooth' }); }}
               className="inline-flex items-center justify-center px-10 py-4 bg-white hover:bg-slate-100 text-slate-900 rounded-3xl font-semibold text-lg active:scale-95 transition-all">
              Explore Cottages
            </a>
            {user ? (
              <button onClick={() => window.location.href = '/cottages'} 
                className="inline-flex items-center justify-center px-10 py-4 border border-white/70 hover:bg-white/10 text-white rounded-3xl font-semibold text-lg transition-all">
                My Bookings
              </button>
            ) : (
              <a href="/register" className="inline-flex items-center justify-center px-10 py-4 border border-white/70 hover:bg-white/10 text-white rounded-3xl font-semibold text-lg transition-all">
                Start your journey
              </a>
            )}
          </div>
        </div>

        <div className="absolute bottom-12 left-1/2 flex flex-col items-center text-white/70 text-xs tracking-widest">
          SCROLL TO DISCOVER <span className="block w-px h-12 bg-white/30 my-3"></span>
        </div>
      </div>

      {/* Trust bar */}
      <div className="bg-white py-5 border-b">
        <div className="max-w-6xl mx-auto px-6 flex flex-wrap justify-center items-center gap-x-12 gap-y-4 text-sm text-slate-400">
          <div>4.9 • 142 REVIEWS</div>
          <div className="h-px w-6 bg-slate-300"></div>
          <div>CHOLPON-ATA • KARAKOL • JETI-OGUZ</div>
          <div className="h-px w-6 bg-slate-300"></div>
          <div>100% PRIVATE COTTAGES</div>
        </div>
      </div>

      <div id="explore" className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex justify-between items-end mb-8">
          <div>
            <div className="uppercase text-teal-600 text-xs tracking-[1.5px] font-medium mb-2">FEATURED STAYS</div>
            <h2 className="text-5xl font-semibold tracking-tight text-slate-900">Popular around the lake</h2>
          </div>
          <a href="/cottages" className="text-sm flex items-center gap-2 group">
            SEE ALL 
            <span className="transition group-hover:translate-x-1">→</span>
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featured.map(cottage => (
            <CottageCard key={cottage.id} cottage={cottage} />
          ))}
        </div>
      </div>

      {/* Why Us */}
      <div className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="mx-auto w-16 h-16 bg-teal-100 rounded-3xl flex items-center justify-center mb-6 text-4xl">🏔️</div>
              <h4 className="font-semibold mb-3 text-xl">Stunning Locations</h4>
              <p className="text-slate-600">All properties are located within 10 minutes of the pristine waters of Issyk-Kul.</p>
            </div>
            <div className="text-center">
              <div className="mx-auto w-16 h-16 bg-teal-100 rounded-3xl flex items-center justify-center mb-6 text-4xl">🔑</div>
              <h4 className="font-semibold mb-3 text-xl">Owner Managed</h4>
              <p className="text-slate-600">Every cottage is personally managed by local owners who know the region best.</p>
            </div>
            <div className="text-center">
              <div className="mx-auto w-16 h-16 bg-teal-100 rounded-3xl flex items-center justify-center mb-6 text-4xl">🌲</div>
              <h4 className="font-semibold mb-3 text-xl">Eco Friendly</h4>
              <p className="text-slate-600">We partner only with accommodations that respect the fragile ecosystem of the lake.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const success = await login(email, password);
    if (success) {
      navigate('/dashboard');
    } else {
      setError('Invalid credentials. Try admin@lakestay.kg / admin or owner@lakestay.kg / owner');
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-3xl shadow-xl p-10">
          <div className="text-center mb-8">
            <div className="mx-auto w-14 h-14 bg-teal-600 text-white rounded-2xl flex items-center justify-center text-4xl mb-6">🏞️</div>
            <h2 className="text-3xl font-semibold text-slate-900">Welcome back</h2>
            <p className="text-slate-500 mt-3">Sign in to manage your lake bookings</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-xs uppercase tracking-widest text-slate-500 mb-1.5">EMAIL ADDRESS</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-5 py-4 border border-slate-200 focus:border-teal-300 rounded-2xl outline-none text-sm"
                placeholder="admin@lakestay.kg"
                required
              />
            </div>
            
            <div>
              <label className="block text-xs uppercase tracking-widest text-slate-500 mb-1.5">PASSWORD</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-5 py-4 border border-slate-200 focus:border-teal-300 rounded-2xl outline-none text-sm"
                placeholder="••••••••"
                required
              />
            </div>

            {error && <div className="text-red-500 text-sm bg-red-50 p-3 rounded-2xl">{error}</div>}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-slate-900 hover:bg-black disabled:bg-slate-400 text-white font-semibold rounded-2xl transition-all text-sm tracking-wider"
            >
              {isLoading ? 'SIGNING IN...' : 'SIGN IN'}
            </button>
          </form>

          <div className="mt-8 text-center text-xs text-slate-500">
            Demo accounts:<br />
            <span className="font-mono">admin@lakestay.kg / admin</span><br />
            <span className="font-mono">owner@lakestay.kg / owner</span><br />
            <span className="font-mono">guest@lakestay.kg / guest</span>
          </div>

          <div className="text-center mt-8">
            <span className="text-slate-500 text-sm">Don't have an account? </span>
            <a href="/register" className="text-teal-600 hover:underline font-medium">Create one free</a>
          </div>
        </div>
      </div>
    </div>
  );
};

const RegisterPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'guest' | 'owner'>('guest');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const success = await register(name, email, password);
    if (success) {
      navigate('/dashboard');
    } else {
      setError('This email is already registered');
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-3xl shadow-xl p-10">
          <div className="text-center mb-8">
            <div className="mx-auto w-14 h-14 bg-gradient-to-br from-teal-500 to-cyan-600 text-white rounded-3xl flex items-center justify-center text-3xl mb-6">🌊</div>
            <h2 className="text-3xl font-semibold text-slate-900">Create an account</h2>
            <p className="text-slate-500 mt-2">Join the LakeStay community</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-xs text-slate-500 block mb-2">FULL NAME</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} required
                className="w-full px-5 h-14 border border-slate-200 rounded-2xl focus:outline-none focus:border-teal-400" placeholder="Elena Petrova" />
            </div>
            
            <div>
              <label className="text-xs text-slate-500 block mb-2">EMAIL</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
                className="w-full px-5 h-14 border border-slate-200 rounded-2xl focus:outline-none focus:border-teal-400" placeholder="you@email.com" />
            </div>

            <div>
              <label className="text-xs text-slate-500 block mb-2">PASSWORD</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required
                className="w-full px-5 h-14 border border-slate-200 rounded-2xl focus:outline-none focus:border-teal-400" placeholder="Create a password" />
            </div>

            <div>
              <label className="text-xs text-slate-500 block mb-2">I WANT TO</label>
              <div className="grid grid-cols-2 gap-3">
                <button type="button" onClick={() => setRole('guest')}
                  className={`h-14 rounded-2xl border text-sm font-medium ${role === 'guest' ? 'border-teal-600 bg-teal-50' : 'border-slate-200'}`}>
                  Book Cottages
                </button>
                <button type="button" onClick={() => setRole('owner')}
                  className={`h-14 rounded-2xl border text-sm font-medium ${role === 'owner' ? 'border-teal-600 bg-teal-50' : 'border-slate-200'}`}>
                  List a Cottage
                </button>
              </div>
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
              type="submit"
              disabled={isLoading}
              className="mt-2 w-full h-14 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-2xl transition-colors"
            >
              {isLoading ? 'CREATING ACCOUNT...' : 'CREATE ACCOUNT'}
            </button>
          </form>

          <p className="text-center mt-8 text-xs text-slate-400">By signing up you agree to our terms and the protection of the lake</p>
        </div>
      </div>
    </div>
  );
};

const CottagesPage: React.FC = () => {
  const { cottages, loading, searchTerm, setSearchTerm, filters, setFilters, sortBy, setSortBy, error } = useCottages();
  const { user } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="animate-spin w-8 h-8 border-4 border-teal-500 border-t-transparent rounded-full mb-4"></div>
          <p className="text-slate-400">Finding the best stays...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-5 py-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <h1 className="text-5xl font-semibold tracking-tighter">All Cottages</h1>
          <p className="text-slate-500 mt-2">Discover {cottages.length} beautiful properties around Issyk-Kul</p>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search cottages or locations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full md:w-80 bg-white border border-slate-200 pl-12 py-4 rounded-3xl text-sm focus:outline-hidden focus:border-teal-400"
            />
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-slate-400 absolute left-5 top-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.25} d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196 7.5 7.5 0 0 0 10.392 10.392" />
            </svg>
          </div>

          <select 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-white border border-slate-200 px-5 py-4 rounded-3xl text-sm focus:outline-hidden focus:border-teal-400"
          >
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Best Rated</option>
            <option value="name">Name A-Z</option>
          </select>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-10 bg-white p-6 rounded-3xl border">
        <div>
          <div className="text-xs font-medium text-slate-500 mb-3">MIN PRICE (USD)</div>
          <input 
            type="range" 
            min="30" 
            max="300" 
            value={filters.minPrice}
            onChange={(e) => setFilters({ ...filters, minPrice: parseInt(e.target.value) })}
            className="accent-teal-600 w-40"
          />
          <div className="text-right text-sm font-mono text-teal-700">${filters.minPrice}</div>
        </div>
        <div>
          <div className="text-xs font-medium text-slate-500 mb-3">MAX PRICE (USD)</div>
          <input 
            type="range" 
            min="100" 
            max="450" 
            value={filters.maxPrice}
            onChange={(e) => setFilters({ ...filters, maxPrice: parseInt(e.target.value) })}
            className="accent-teal-600 w-40"
          />
          <div className="text-right text-sm font-mono text-teal-700">${filters.maxPrice}</div>
        </div>
        <div>
          <div className="text-xs font-medium text-slate-500 mb-3">MIN GUESTS</div>
          <select 
            value={filters.capacity} 
            onChange={(e) => setFilters({ ...filters, capacity: parseInt(e.target.value) })}
            className="bg-white border border-slate-200 rounded-2xl px-4 py-3 text-sm"
          >
            {[1,2,4,6,8].map(n => (
              <option key={n} value={n}>{n}+ people</option>
            ))}
          </select>
        </div>
      </div>

      {error && <div className="bg-red-100 border border-red-300 p-4 rounded-2xl text-red-700 mb-8">{error}</div>}

      {cottages.length === 0 ? (
        <div className="bg-white border border-dashed border-slate-300 py-20 text-center rounded-3xl">
          <div className="mx-auto text-6xl mb-6 opacity-40">🏚️</div>
          <p className="text-xl text-slate-400">No cottages match your filters</p>
          <button onClick={() => {
            setSearchTerm('');
            setFilters({ minPrice: 0, maxPrice: 300, capacity: 1 });
          }} className="mt-6 text-sm underline">Clear all filters</button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {cottages.map((cottage) => (
            <CottageCard 
              key={cottage.id} 
              cottage={cottage} 
              isOwner={!!(user && (user.id === cottage.ownerId || user.role === 'admin'))}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const CottageDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { fetchCottageById, createBooking, cottages } = useCottages();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [cottage, setCottage] = useState<Cottage | null>(null);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(2);
  const [isBooking, setIsBooking] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (id) {
      const found = fetchCottageById(id);
      if (found) {
        setCottage(found);
      } else {
        // Try to find in list
        const fromList = cottages.find(c => c.id === id);
        if (fromList) setCottage(fromList);
      }
    }
  }, [id, fetchCottageById, cottages]);

  const handleBook = async () => {
    if (!cottage || !user || !checkIn || !checkOut) return;

    setIsBooking(true);
    
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    const nights = Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 3600 * 24));
    
    if (nights < 1) {
      alert("Check-out must be after check-in");
      setIsBooking(false);
      return;
    }

    const totalPrice = cottage.pricePerNight * nights;

    try {
      await createBooking({
        cottageId: cottage.id,
        userId: user.id,
        checkIn,
        checkOut,
        guests,
        totalPrice
      });
      
      setShowSuccess(true);
      
      setTimeout(() => {
        setShowSuccess(false);
        navigate('/profile');
      }, 2100);
    } catch (e) {
      alert('Booking failed. Please try again.');
    }
    
    setIsBooking(false);
  };

  if (!cottage) {
    return <div className="min-h-[70vh] flex items-center justify-center">Cottage not found</div>;
  }

  const nights = checkIn && checkOut ? 
    Math.ceil((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / (1000 * 3600 * 24)) : 0;

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <button onClick={() => navigate(-1)} className="flex items-center gap-1.5 text-slate-500 hover:text-slate-900 mb-8 text-sm">
        ← Back to list
      </button>

      <div className="grid md:grid-cols-5 gap-10">
        {/* Image & Info */}
        <div className="md:col-span-3">
          <img src={cottage.image} alt={cottage.title} className="w-full aspect-video object-cover rounded-3xl" />
          
          <div className="mt-8">
            <div className="flex justify-between items-start">
              <div>
                <div className="uppercase text-xs text-teal-600 tracking-widest mb-1">{cottage.location}</div>
                <h1 className="text-5xl font-semibold tracking-tight text-slate-900">{cottage.title}</h1>
              </div>
              <div className="text-right">
                <div className="text-4xl font-semibold text-teal-600">${cottage.pricePerNight}</div>
                <div className="text-xs text-slate-400 -mt-1">PER NIGHT</div>
              </div>
            </div>
            
            <div className="flex items-center gap-6 mt-8 text-sm">
              <div className="flex items-center gap-2">
                <div className="bg-slate-100 text-slate-600 px-4 py-2 rounded-3xl flex items-center gap-2">
                  <span>🛏️</span> {cottage.bedrooms} bedrooms
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="bg-slate-100 text-slate-600 px-4 py-2 rounded-3xl flex items-center gap-2">
                  👥 Up to {cottage.capacity} guests
                </div>
              </div>
              <div className="flex items-center gap-1 text-amber-500">
                ★★★★ <span className="text-slate-400 ml-1 text-xs">({cottage.rating})</span>
              </div>
            </div>

            <div className="my-12 border-t border-b py-8">
              <h4 className="font-medium mb-5 text-lg">What this place offers</h4>
              <div className="grid grid-cols-2 gap-3">
                {cottage.amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center gap-3 text-slate-700">
                    <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                    {amenity}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-4">About this cottage</h4>
              <p className="leading-relaxed text-slate-600">{cottage.description}</p>
              <p className="mt-6 text-xs text-slate-400">Located in the breathtaking northern shore of Lake Issyk-Kul, one of the largest alpine lakes in the world.</p>
            </div>
          </div>
        </div>

        {/* Booking Sidebar */}
        <div className="md:col-span-2">
          <div className="bg-white border rounded-3xl p-8 sticky top-6">
            <h3 className="font-semibold text-xl mb-6">Reserve your stay</h3>
            
            {!user ? (
              <div className="bg-amber-50 border border-amber-200 p-8 rounded-3xl text-center">
                <p className="text-amber-500 mb-4">Please sign in to book this cottage</p>
                <button onClick={() => navigate('/login')} className="text-sm font-medium underline">Sign in →</button>
              </div>
            ) : (
              <>
                <div className="space-y-6">
                  <div>
                    <label className="block text-xs tracking-widest text-slate-500 mb-2">CHECK IN</label>
                    <input 
                      type="date" 
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                      className="w-full h-14 border border-slate-200 rounded-2xl px-5 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs tracking-widest text-slate-500 mb-2">CHECK OUT</label>
                    <input 
                      type="date" 
                      value={checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                      className="w-full h-14 border border-slate-200 rounded-2xl px-5 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs tracking-widest text-slate-500 mb-2">GUESTS</label>
                    <select value={guests} onChange={(e) => setGuests(parseInt(e.target.value))} className="w-full h-14 border border-slate-200 rounded-2xl px-5 text-sm">
                      {[1,2,3,4,5,6,7,8].map(n => <option key={n} value={n}>{n} guests</option>)}
                    </select>
                  </div>
                </div>

                {nights > 0 && (
                  <div className="mt-8 pt-6 border-t text-sm">
                    <div className="flex justify-between mb-2">
                      <span>${cottage.pricePerNight} × {nights} nights</span>
                      <span>${cottage.pricePerNight * nights}</span>
                    </div>
                    <div className="flex justify-between font-semibold text-base mt-4 pt-4 border-t">
                      <span>Total</span>
                      <span>${cottage.pricePerNight * nights}</span>
                    </div>
                  </div>
                )}

                <button 
                  onClick={handleBook}
                  disabled={isBooking || !checkIn || !checkOut}
                  className="mt-8 w-full h-16 bg-gradient-to-r from-teal-500 to-cyan-600 text-white font-semibold rounded-3xl disabled:opacity-60 flex items-center justify-center gap-2 hover:brightness-110 transition"
                >
                  {isBooking ? 'CONFIRMING...' : 'CONFIRM BOOKING'}
                </button>

                <p className="text-center text-[10px] text-slate-400 mt-6">You won't be charged yet</p>
              </>
            )}
          </div>
        </div>
      </div>
      
      {showSuccess && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-[100]">
          <div className="bg-white rounded-3xl max-w-md w-full p-10 text-center">
            <CheckCircle className="w-20 h-20 text-teal-500 mx-auto mb-6" />
            <h3 className="text-3xl font-semibold mb-2">Booking Confirmed!</h3>
            <p className="text-slate-600">Your stay at {cottage.title} has been reserved.<br />See you on the lake.</p>
          </div>
        </div>
      )}
    </div>
  );
};

const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const { getMyBookings, cottages } = useCottages();
  const myBookings = getMyBookings();

  const totalSpent = myBookings.reduce((sum, b) => sum + b.totalPrice, 0);
  const upcoming = myBookings.filter(b => new Date(b.checkIn) > new Date());

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex items-center justify-between mb-12">
        <div>
          <div className="text-teal-600 text-xs tracking-[3px] font-medium">WELCOME BACK</div>
          <h1 className="text-6xl tracking-tighter font-semibold text-slate-900">Good morning, {user?.name.split(' ')[0]}</h1>
        </div>
        <div className="text-right">
          <div className="text-xs text-slate-400">YOUR ROLE</div>
          <div className="uppercase text-xl font-semibold text-teal-600 tracking-widest">{user?.role}</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Stats */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white p-8 rounded-3xl border">
            <div className="flex justify-between">
              <div>
                <div className="text-xs text-slate-400">TOTAL BOOKED</div>
                <div className="text-7xl font-semibold text-slate-800 mt-3 tracking-tighter">{myBookings.length}</div>
              </div>
              <div className="text-6xl">🛖</div>
            </div>
          </div>
          
          <div className="bg-white p-8 rounded-3xl border">
            <div className="flex justify-between">
              <div>
                <div className="text-xs text-slate-400">MONEY SPENT</div>
                <div className="text-7xl font-semibold text-slate-800 mt-3 tracking-tighter">${totalSpent}</div>
              </div>
              <div className="text-6xl">💵</div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-8 bg-white border rounded-3xl p-8">
          <div className="flex justify-between items-center mb-8">
            <h3 className="font-semibold text-2xl">Upcoming Trips</h3>
            <button onClick={() => window.location.href = '/profile'} className="text-teal-600 text-sm font-medium flex items-center gap-2">MANAGE ALL BOOKINGS →</button>
          </div>

          {upcoming.length > 0 ? (
            <div className="space-y-6">
              {upcoming.map(booking => {
                const cottage = cottages.find(c => c.id === booking.cottageId);
                return (
                  <div key={booking.id} className="flex gap-6 bg-slate-50 p-6 rounded-3xl">
                    <img src={cottage?.image} alt="" className="w-28 h-20 object-cover rounded-2xl" />
                    <div className="flex-1">
                      <div className="font-medium">{cottage?.title}</div>
                      <div className="text-xs text-slate-500">{booking.checkIn} — {booking.checkOut}</div>
                      <div className="text-teal-700 text-sm mt-6 font-medium">CONFIRMED • {booking.guests} GUESTS</div>
                    </div>
                    <div className="text-right font-mono text-sm">
                      ${booking.totalPrice}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="h-72 flex items-center justify-center text-slate-400 flex-col">
              <div className="text-6xl mb-6 opacity-30">🌅</div>
              <p>No upcoming bookings yet</p>
              <a href="/cottages" className="text-teal-600 underline text-sm mt-4">Browse available cottages</a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const ProfilePage: React.FC = () => {
  const { user, logout } = useAuth();
  const { getMyBookings, cancelBooking, cottages } = useCottages();
  const [showConfirm, setShowConfirm] = useState<string | null>(null);
  const myBookings = getMyBookings();

  const handleCancel = async (bookingId: string) => {
    await cancelBooking(bookingId);
    setShowConfirm(null);
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="flex justify-between items-center mb-12">
        <div className="flex items-center gap-6">
          {user?.avatar && <img src={user.avatar} alt="" className="w-24 h-24 rounded-3xl object-cover ring-8 ring-white shadow" />}
          <div>
            <h1 className="text-5xl font-semibold tracking-tight">{user?.name}</h1>
            <div className="flex items-center gap-4 text-sm mt-3">
              <div className="px-6 py-2 bg-white border rounded-3xl">{user?.email}</div>
              <div className="px-5 py-2 bg-teal-100 text-teal-700 rounded-3xl font-medium uppercase text-xs tracking-wider">VERIFIED MEMBER</div>
            </div>
          </div>
        </div>
        
        <button onClick={logout} className="px-8 py-3 text-red-500 border border-red-200 hover:bg-red-50 rounded-3xl text-sm font-medium">Sign Out</button>
      </div>

      <div className="bg-white rounded-3xl p-10 border">
        <h2 className="font-semibold text-2xl mb-8 flex items-center gap-3"><Calendar className="text-teal-500" /> My Bookings</h2>
        
        {myBookings.length === 0 ? (
          <div className="text-center py-16 text-slate-400">
            You have no bookings yet. <a href="/cottages" className="underline text-teal-600">Start exploring</a>
          </div>
        ) : (
          <div className="space-y-5">
            {myBookings.map((booking) => {
              const cottage = cottages.find(c => c.id === booking.cottageId);
              return (
                <div key={booking.id} className="flex items-center justify-between border rounded-3xl p-6 hover:border-teal-200 group">
                  <div className="flex gap-6">
                    {cottage && <img src={cottage.image} className="w-24 h-20 rounded-2xl object-cover" />}
                    <div>
                      <div className="font-semibold text-lg">{cottage?.title}</div>
                      <div className="text-xs text-slate-500 mt-px">{cottage?.location}</div>
                      <div className="mt-5 flex items-center gap-8 text-xs">
                        <div>
                          <span className="text-slate-400">CHECK-IN</span><br />
                          <span className="font-medium text-slate-700">{booking.checkIn}</span>
                        </div>
                        <div>
                          <span className="text-slate-400">CHECK-OUT</span><br />
                          <span className="font-medium text-slate-700">{booking.checkOut}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right flex flex-col items-end">
                    <div className="font-mono text-xl text-teal-600">${booking.totalPrice}</div>
                    <div className={`uppercase text-[10px] px-4 py-1 mt-4 rounded-3xl ${booking.status === 'confirmed' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>
                      {booking.status}
                    </div>
                    
                    {booking.status === 'confirmed' && (
                      <button 
                        onClick={() => setShowConfirm(booking.id)}
                        className="mt-6 text-xs text-red-400 hover:text-red-500 flex items-center gap-1 group-hover:opacity-100 opacity-60"
                      >
                        <Trash2 className="w-3 h-3" /> CANCEL
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {showConfirm && (
        <div className="fixed inset-0 bg-black/60 z-[9999] flex items-center justify-center">
          <div className="bg-white rounded-3xl max-w-xs w-full p-8">
            <h4 className="font-medium">Cancel this booking?</h4>
            <p className="text-sm text-slate-500 mt-2">This action cannot be undone.</p>
            
            <div className="grid grid-cols-2 gap-4 mt-8">
              <button onClick={() => setShowConfirm(null)} className="py-4 text-sm border rounded-2xl">Keep booking</button>
              <button onClick={() => handleCancel(showConfirm)} className="py-4 text-sm bg-red-600 text-white rounded-2xl">Yes, cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const AdminPanel: React.FC = () => {
  const { cottages, deleteCottage } = useCottages();

  const handleDelete = async (id: string) => {
    if (confirm('Delete this cottage permanently?')) {
      await deleteCottage(id);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex items-center justify-between mb-12">
        <div>
          <div className="font-mono text-xs bg-red-100 text-red-700 px-4 py-1 inline-block rounded mb-2">ADMIN ONLY</div>
          <h1 className="text-5xl font-semibold tracking-tighter">Management Dashboard</h1>
        </div>
        <div className="text-xs px-5 py-3 bg-white shadow text-slate-400 rounded-3xl">Total Cottages: {cottages.length}</div>
      </div>

      <div className="bg-white rounded-3xl">
        <div className="grid grid-cols-12 gap-px bg-slate-100 p-px rounded-t-3xl text-xs font-medium text-slate-500">
          <div className="col-span-5 py-5 px-8">COTTAGE</div>
          <div className="col-span-2 py-5 px-4">OWNER</div>
          <div className="col-span-2 py-5 px-4">PRICE</div>
          <div className="col-span-3 py-5 px-8 text-right">ACTIONS</div>
        </div>
        
        {cottages.map(cottage => (
          <div key={cottage.id} className="grid grid-cols-12 gap-px border-b last:border-none hover:bg-slate-50 px-8 py-6 items-center text-sm">
            <div className="col-span-5 flex items-center gap-4">
              <img src={cottage.image} alt="" className="w-12 h-12 rounded-2xl object-cover" />
              <div>
                <div className="font-medium">{cottage.title}</div>
                <div className="text-xs text-slate-500">{cottage.location}</div>
              </div>
            </div>
            <div className="col-span-2 text-slate-500 text-xs font-mono">
              {cottage.ownerId === '1' ? 'ADMIN' : 'OWNER'}
            </div>
            <div className="col-span-2 font-medium">${cottage.pricePerNight}</div>
            <div className="col-span-3 flex justify-end gap-3">
              <button 
                onClick={() => window.location.href = `/edit/${cottage.id}`}
                className="px-5 py-2 text-xs border flex items-center gap-1 rounded-2xl hover:bg-white"
              >
                <Edit3 className="w-3 h-3" /> EDIT
              </button>
              <button 
                onClick={() => handleDelete(cottage.id)}
                className="px-5 py-2 text-xs border border-red-200 text-red-500 flex items-center gap-1 rounded-2xl hover:bg-red-50"
              >
                <Trash2 className="w-3 h-3" /> DELETE
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="text-xs text-center text-slate-400 mt-8">All changes persist in localStorage</div>
    </div>
  );
};

const CreateEditPage: React.FC<{ isEdit?: boolean }> = ({ isEdit = false }) => {
  const { createCottage, updateCottage, fetchCottageById } = useCottages();
  const navigate = useNavigate();
  const { id } = useParams<{ id?: string }>();
  
  const [form, setForm] = useState({
    title: '',
    description: '',
    location: '',
    pricePerNight: 120,
    capacity: 4,
    bedrooms: 2,
    amenities: ['WiFi', 'Kitchen', 'Lake View'],
    image: 'https://picsum.photos/id/1015/600/400',
    rating: 4.7,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isEdit && id) {
      const existing = fetchCottageById(id);
      if (existing) {
        setForm({
          title: existing.title,
          description: existing.description,
          location: existing.location,
          pricePerNight: existing.pricePerNight,
          capacity: existing.capacity,
          bedrooms: existing.bedrooms,
          amenities: [...existing.amenities],
          image: existing.image,
          rating: existing.rating,
        });
      }
    }
  }, [id, isEdit, fetchCottageById]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (isEdit && id) {
        await updateCottage(id, form);
      } else {
        await createCottage(form as any);
      }
      navigate('/cottages');
    } catch (err) {
      alert('Failed to save cottage');
    }
    
    setIsSubmitting(false);
  };

  return (
    <div className="max-w-2xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-semibold mb-2 tracking-tight">{isEdit ? 'Edit Cottage' : 'List New Cottage'}</h1>
      <p className="text-slate-500 mb-10">Share your property with travelers near Issyk-Kul</p>
      
      <form onSubmit={handleSubmit} className="space-y-8 bg-white p-10 rounded-3xl border">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className="block text-xs font-medium text-slate-500 mb-2">COTTAGE TITLE</label>
            <input 
              type="text" 
              value={form.title} 
              onChange={(e) => setForm({...form, title: e.target.value})}
              className="w-full border border-slate-200 focus:border-teal-500 rounded-2xl px-6 py-4" 
              required 
            />
          </div>
          
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-2">LOCATION</label>
            <input 
              type="text" 
              value={form.location} 
              onChange={(e) => setForm({...form, location: e.target.value})}
              className="w-full border border-slate-200 focus:border-teal-500 rounded-2xl px-6 py-4" 
              placeholder="Cholpon-Ata, Issyk-Kul" 
              required 
            />
          </div>
          
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-2">PRICE PER NIGHT</label>
            <input 
              type="number" 
              value={form.pricePerNight} 
              onChange={(e) => setForm({...form, pricePerNight: parseInt(e.target.value)})}
              className="w-full border border-slate-200 focus:border-teal-500 rounded-2xl px-6 py-4" 
              required 
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-500 mb-2">DESCRIPTION</label>
          <textarea 
            value={form.description} 
            onChange={(e) => setForm({...form, description: e.target.value})}
            rows={5}
            className="w-full border border-slate-200 focus:border-teal-500 rounded-3xl px-6 py-5 text-sm" 
            required 
          />
        </div>

        <div className="grid grid-cols-3 gap-6">
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-2">CAPACITY</label>
            <input type="number" value={form.capacity} onChange={(e) => setForm({...form, capacity: parseInt(e.target.value)})} className="w-full border border-slate-200 focus:border-teal-500 rounded-2xl px-6 py-4" />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-2">BEDROOMS</label>
            <input type="number" value={form.bedrooms} onChange={(e) => setForm({...form, bedrooms: parseInt(e.target.value)})} className="w-full border border-slate-200 focus:border-teal-500 rounded-2xl px-6 py-4" />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-2">RATING</label>
            <input type="number" step="0.1" value={form.rating} onChange={(e) => setForm({...form, rating: parseFloat(e.target.value)})} className="w-full border border-slate-200 focus:border-teal-500 rounded-2xl px-6 py-4" />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-500 mb-3">IMAGE URL</label>
          <input 
            type="text" 
            value={form.image} 
            onChange={(e) => setForm({...form, image: e.target.value})}
            className="w-full border border-slate-200 focus:border-teal-500 rounded-2xl px-6 py-4 font-mono text-xs" 
          />
        </div>

        <button 
          type="submit" 
          disabled={isSubmitting}
          className="w-full h-[60px] bg-teal-600 text-white text-sm tracking-widest font-semibold rounded-3xl hover:bg-teal-700 disabled:bg-slate-300 transition-colors"
        >
          {isSubmitting ? 'SAVING...' : isEdit ? 'UPDATE COTTAGE' : 'PUBLISH COTTAGE'}
        </button>
      </form>
    </div>
  );
};

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="text-center">
        <div className="text-[180px] leading-none font-black text-slate-100 select-none">404</div>
        <h2 className="text-3xl -mt-8 text-slate-900 tracking-tight">Page not found</h2>
        <p className="text-slate-500 mt-4 max-w-xs mx-auto">The cottage you are looking for may have been moved or is no longer listed.</p>
        <a href="/" className="inline-block mt-8 px-8 py-3.5 text-sm border bg-white rounded-3xl">RETURN HOME</a>
      </div>
    </div>
  );
};

const AppContent: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-slate-50">
        <Navbar />
        
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/cottages" element={<CottagesPage />} />
          <Route path="/cottages/:id" element={<CottageDetailPage />} />
          
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          } />
          
          <Route path="/profile" element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          } />
          
          <Route path="/admin" element={
            <ProtectedRoute requiredRole="admin">
              <AdminPanel />
            </ProtectedRoute>
          } />
          
          <Route path="/create" element={
            <ProtectedRoute>
              <CreateEditPage />
            </ProtectedRoute>
          } />
          
          <Route path="/edit/:id" element={
            <ProtectedRoute>
              <CreateEditPage isEdit={true} />
            </ProtectedRoute>
          } />
          
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        
        <footer className="bg-slate-900 text-white/60 py-16 text-xs">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-y-12">
            <div>
              <div className="flex items-center gap-3 text-white mb-6">
                <div className="text-4xl">⛰️</div>
                <div className="font-semibold text-3xl tracking-tighter">LakeStay</div>
              </div>
              <div>© {new Date().getFullYear()} Issyk-Kul Experiences</div>
            </div>
            
            <div className="space-y-2">
              <div className="text-white/90 text-sm mb-4">PLATFORM</div>
              <div>Cottages</div>
              <div>Experiences</div>
              <div>Journal</div>
            </div>
            
            <div className="space-y-2">
              <div className="text-white/90 text-sm mb-4">COMMUNITY</div>
              <div>Owners</div>
              <div>Become a host</div>
              <div>Support the lake</div>
            </div>
            
            <div>
              <div className="text-white/90 text-sm mb-4">LEGAL</div>
              <div className="leading-snug opacity-70">This is a fictional demo website built to showcase a full-featured booking application using React, TypeScript, React Router, Context API, and Tailwind CSS. All data is mocked and saved to localStorage.</div>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <CottageProvider>
        <AppContent />
      </CottageProvider>
    </AuthProvider>
  );
};

export default App;
