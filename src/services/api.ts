import { Cottage, Booking, User } from '../types';
import { mockCottages, mockBookings, mockUsers } from './mockData';

let cottages = [...mockCottages];
let bookings = [...mockBookings];
let users = [...mockUsers];

const delay = (ms: number = 600) => new Promise(resolve => setTimeout(resolve, ms));

export const api = {
  // Auth
  async login(email: string, _password: string): Promise<User | null> {
    await delay(800);
    const user = users.find(u => u.email === email);
    if (user && _password.length >= 3) { // Simple mock validation
      return user;
    }
    return null;
  },

  async register(name: string, email: string, password: string): Promise<User | null> {
    await delay(700);
    const existing = users.find(u => u.email === email);
    if (existing) return null;

    const newUser: User = {
      id: Date.now().toString(36),
      name,
      email,
      role: 'guest' as const,
      avatar: `https://i.pravatar.cc/150?u=${email}`
    };
    users.push(newUser);
    return newUser;
  },

  // Cottages
  async getCottages(): Promise<Cottage[]> {
    await delay(500);
    return [...cottages];
  },

  async getCottageById(id: string): Promise<Cottage | undefined> {
    await delay(400);
    return cottages.find(c => c.id === id);
  },

  async createCottage(data: Omit<Cottage, 'id'>): Promise<Cottage> {
    await delay(600);
    const newCottage: Cottage = {
      ...data,
      id: 'c' + Date.now().toString(36),
    };
    cottages.push(newCottage);
    return newCottage;
  },

  async updateCottage(id: string, updates: Partial<Cottage>): Promise<Cottage> {
    await delay(500);
    const index = cottages.findIndex(c => c.id === id);
    if (index === -1) throw new Error('Cottage not found');
    
    cottages[index] = { ...cottages[index], ...updates };
    return cottages[index];
  },

  async deleteCottage(id: string): Promise<boolean> {
    await delay(500);
    const index = cottages.findIndex(c => c.id === id);
    if (index === -1) return false;
    cottages.splice(index, 1);
    return true;
  },

  // Bookings
  async getBookings(): Promise<Booking[]> {
    await delay(400);
    return bookings.map(b => {
      const cottage = cottages.find(c => c.id === b.cottageId);
      return { ...b, cottage };
    });
  },

  async createBooking(bookingData: Omit<Booking, 'id' | 'status' | 'cottage'>): Promise<Booking> {
    await delay(700);
    const newBooking: Booking = {
      ...bookingData,
      id: 'b' + Date.now().toString(36),
      status: 'confirmed',
    };
    bookings.push(newBooking);
    return newBooking;
  },

  async cancelBooking(id: string): Promise<boolean> {
    await delay(500);
    const index = bookings.findIndex(b => b.id === id);
    if (index !== -1) {
      bookings[index].status = 'cancelled';
      return true;
    }
    return false;
  },

  // For admin
  getUsers() {
    return [...users];
  }
};