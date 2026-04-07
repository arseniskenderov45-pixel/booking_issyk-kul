import React, { createContext, useContext, useState, useEffect, ReactNode, useMemo } from 'react';
import { Cottage, Booking, CottageContextType } from '../types';
import { api } from '../services/api';
import { useAuth } from './AuthContext';

const CottageContext = createContext<CottageContextType | undefined>(undefined);

export const useCottages = () => {
  const context = useContext(CottageContext);
  if (context === undefined) {
    throw new Error('useCottages must be used within CottageProvider');
  }
  return context;
};

interface CottageProviderProps {
  children: ReactNode;
}

export const CottageProvider: React.FC<CottageProviderProps> = ({ children }) => {
  const { user } = useAuth();
  const [cottages, setCottages] = useState<Cottage[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({ minPrice: 0, maxPrice: 300, capacity: 1 });
  const [sortBy, setSortBy] = useState('price-low');

  const fetchCottages = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.getCottages();
      setCottages(data);
    } catch (err) {
      setError('Failed to fetch cottages');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchBookings = async () => {
    try {
      const data = await api.getBookings();
      setBookings(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCottages();
    if (user) {
      fetchBookings();
    }
  }, [user]);

  const fetchCottageById = (id: string): Cottage | undefined => {
    return cottages.find(c => c.id === id);
  };

  const createCottage = async (cottageData: Omit<Cottage, 'id'>): Promise<Cottage> => {
    const newCottage = await api.createCottage({
      ...cottageData,
      ownerId: user?.id || '1',
    });
    setCottages(prev => [...prev, newCottage]);
    return newCottage;
  };

  const updateCottage = async (id: string, updates: Partial<Cottage>): Promise<Cottage> => {
    const updated = await api.updateCottage(id, updates);
    setCottages(prev => prev.map(c => c.id === id ? updated : c));
    return updated;
  };

  const deleteCottage = async (id: string): Promise<boolean> => {
    const success = await api.deleteCottage(id);
    if (success) {
      setCottages(prev => prev.filter(c => c.id !== id));
    }
    return success;
  };

  const createBooking = async (bookingData: Omit<Booking, 'id' | 'status' | 'cottage'>): Promise<Booking> => {
    const newBooking = await api.createBooking(bookingData);
    const cottage = cottages.find(c => c.id === bookingData.cottageId);
    const bookingWithCottage = { ...newBooking, cottage };
    setBookings(prev => [...prev, bookingWithCottage]);
    return bookingWithCottage;
  };

  const cancelBooking = async (id: string): Promise<boolean> => {
    const success = await api.cancelBooking(id);
    if (success) {
      setBookings(prev => prev.map(b => b.id === id ? { ...b, status: 'cancelled' } : b));
    }
    return success;
  };

  const getMyBookings = (): Booking[] => {
    if (!user) return [];
    return bookings.filter(b => b.userId === user.id);
  };

  // Filtered and sorted cottages
  const filteredCottages = useMemo(() => {
    let result = [...cottages];

    // Search
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(cottage => 
        cottage.title.toLowerCase().includes(term) || 
        cottage.location.toLowerCase().includes(term) ||
        cottage.description.toLowerCase().includes(term)
      );
    }

    // Filter
    result = result.filter(cottage => {
      const priceMatch = cottage.pricePerNight >= filters.minPrice && 
                        cottage.pricePerNight <= filters.maxPrice;
      const capacityMatch = cottage.capacity >= filters.capacity;
      return priceMatch && capacityMatch;
    });

    // Sort
    if (sortBy === 'price-low') {
      result.sort((a, b) => a.pricePerNight - b.pricePerNight);
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.pricePerNight - a.pricePerNight);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'name') {
      result.sort((a, b) => a.title.localeCompare(b.title));
    }

    return result;
  }, [cottages, searchTerm, filters, sortBy]);

  const value: CottageContextType = {
    cottages: filteredCottages,
    bookings,
    loading,
    error,
    fetchCottages,
    fetchCottageById,
    createCottage,
    updateCottage,
    deleteCottage,
    createBooking,
    cancelBooking,
    getMyBookings,
    searchTerm,
    setSearchTerm,
    filters,
    setFilters,
    sortBy,
    setSortBy,
  };

  return (
    <CottageContext.Provider value={value}>
      {children}
    </CottageContext.Provider>
  );
};