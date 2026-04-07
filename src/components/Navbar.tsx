import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { LogOut, User, Home, MapPin, Plus, BarChart3, Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="w-9 h-9 bg-teal-600 rounded-2xl flex items-center justify-center">
              <span className="text-white text-2xl font-bold">⛰️</span>
            </div>
            <div>
              <span className="font-semibold text-2xl tracking-tighter text-slate-900">LakeStay</span>
              <p className="text-[10px] text-teal-600 -mt-1">ISSYK-KUL</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link 
              to="/" 
              className={`flex items-center gap-1.5 text-sm font-medium transition-colors ${isActive('/') ? 'text-teal-600' : 'text-slate-600 hover:text-slate-900'}`}
            >
              <Home className="w-4 h-4" /> Home
            </Link>
            <Link 
              to="/cottages" 
              className={`flex items-center gap-1.5 text-sm font-medium transition-colors ${isActive('/cottages') ? 'text-teal-600' : 'text-slate-600 hover:text-slate-900'}`}
            >
              <MapPin className="w-4 h-4" /> Cottages
            </Link>
            
            {user && (
              <>
                <Link 
                  to="/dashboard" 
                  className={`flex items-center gap-1.5 text-sm font-medium transition-colors ${isActive('/dashboard') ? 'text-teal-600' : 'text-slate-600 hover:text-slate-900'}`}
                >
                  <BarChart3 className="w-4 h-4" /> Dashboard
                </Link>
                <Link 
                  to="/profile" 
                  className={`flex items-center gap-1.5 text-sm font-medium transition-colors ${isActive('/profile') ? 'text-teal-600' : 'text-slate-600 hover:text-slate-900'}`}
                >
                  <User className="w-4 h-4" /> Profile
                </Link>
              </>
            )}

            {user?.role === 'admin' && (
              <Link 
                to="/admin" 
                className={`flex items-center gap-1.5 px-4 py-1.5 text-sm font-semibold rounded-xl bg-amber-100 text-amber-700 hover:bg-amber-200 transition-colors`}
              >
                Admin
              </Link>
            )}

            {user?.role === 'owner' && (
              <Link 
                to="/create" 
                className="flex items-center gap-2 px-5 py-2 bg-teal-600 hover:bg-teal-700 text-white text-sm font-medium rounded-2xl transition-all active:scale-[0.985]"
              >
                <Plus className="w-4 h-4" /> Add Cottage
              </Link>
            )}
          </div>

          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-3">
                  <img 
                    src={user.avatar} 
                    alt={user.name}
                    className="w-8 h-8 rounded-2xl object-cover border border-slate-200"
                  />
                  <div className="text-right">
                    <div className="text-sm font-medium text-slate-800">{user.name.split(' ')[0]}</div>
                    <div className="text-[10px] uppercase tracking-widest text-teal-500 font-mono">{user.role}</div>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 text-sm text-slate-500 hover:text-red-600 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link 
                  to="/login"
                  className="px-6 py-2 text-sm font-medium text-slate-700 hover:text-slate-900 transition-colors"
                >
                  Log in
                </Link>
                <Link 
                  to="/register"
                  className="px-6 py-2 text-sm font-semibold bg-slate-900 hover:bg-black text-white rounded-2xl transition-all"
                >
                  Join now
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-slate-700"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t bg-white py-4">
          <div className="px-6 flex flex-col gap-4 text-sm">
            <Link to="/" onClick={() => setIsMenuOpen(false)} className="py-2 flex items-center gap-3">🏠 Home</Link>
            <Link to="/cottages" onClick={() => setIsMenuOpen(false)} className="py-2 flex items-center gap-3">📍 Cottages</Link>
            
            {user && (
              <>
                <Link to="/dashboard" onClick={() => setIsMenuOpen(false)} className="py-2 flex items-center gap-3">📊 Dashboard</Link>
                <Link to="/profile" onClick={() => setIsMenuOpen(false)} className="py-2 flex items-center gap-3">👤 Profile</Link>
                {user.role === 'admin' && <Link to="/admin" onClick={() => setIsMenuOpen(false)} className="py-2 flex items-center gap-3">⚙️ Admin Panel</Link>}
                {user.role !== 'guest' && <Link to="/create" onClick={() => setIsMenuOpen(false)} className="py-2 flex items-center gap-3">➕ Create Cottage</Link>}
              </>
            )}

            {user ? (
              <button 
                onClick={handleLogout}
                className="mt-2 flex w-full items-center justify-center gap-2 py-3 bg-red-50 hover:bg-red-100 text-red-600 rounded-2xl font-medium"
              >
                <LogOut className="w-4 h-4" /> Sign Out
              </button>
            ) : (
              <div className="flex flex-col gap-3 pt-3 border-t">
                <Link 
                  to="/login" 
                  onClick={() => setIsMenuOpen(false)}
                  className="py-3 text-center font-medium text-slate-700 border border-slate-200 rounded-2xl"
                >
                  Log in
                </Link>
                <Link 
                  to="/register" 
                  onClick={() => setIsMenuOpen(false)}
                  className="py-3 text-center font-semibold bg-slate-900 text-white rounded-2xl"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;