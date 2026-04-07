export interface User {
  id: string;
  name: string;
  email: string;
  role: 'guest' | 'owner' | 'admin';
  avatar?: string;
}

export interface Cottage {
  id: string;
  title: string;
  description: string;
  location: string;
  pricePerNight: number;
  capacity: number;
  bedrooms: number;
  amenities: string[];
  image: string;
  ownerId: string;
  rating: number;
}

export interface Booking {
  id: string;
  cottageId: string;
  userId: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  totalPrice: number;
  status: 'confirmed' | 'pending' | 'cancelled';
  cottage?: Cottage;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string, role?: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

export interface CottageContextType {
  cottages: Cottage[];
  bookings: Booking[];
  loading: boolean;
  error: string | null;
  fetchCottages: () => Promise<void>;
  fetchCottageById: (id: string) => Cottage | undefined;
  createCottage: (cottage: Omit<Cottage, 'id'>) => Promise<Cottage>;
  updateCottage: (id: string, cottage: Partial<Cottage>) => Promise<Cottage>;
  deleteCottage: (id: string) => Promise<boolean>;
  createBooking: (bookingData: Omit<Booking, 'id' | 'status' | 'cottage'>) => Promise<Booking>;
  cancelBooking: (id: string) => Promise<boolean>;
  getMyBookings: () => Booking[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filters: any;
  setFilters: (filters: any) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
}