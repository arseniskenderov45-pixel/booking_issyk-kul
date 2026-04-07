import { Cottage, User, Booking } from '../types';

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@lakestay.kg',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150'
  },
  {
    id: '2',
    name: 'Elena Petrova',
    email: 'owner@lakestay.kg',
    role: 'owner',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150'
  },
  {
    id: '3',
    name: 'Alex Chen',
    email: 'guest@lakestay.kg',
    role: 'guest',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150'
  }
];

export const mockCottages: Cottage[] = [
  {
    id: 'c1',
    title: 'Lakeview Haven',
    description: 'Stunning cottage with panoramic views of Issyk-Kul. Private beach access and modern amenities.',
    location: 'Cholpon-Ata, Issyk-Kul',
    pricePerNight: 145,
    capacity: 6,
    bedrooms: 3,
    amenities: ['WiFi', 'Kitchen', 'Lake Access', 'Fireplace', 'BBQ'],
    image: 'https://cf.bstatic.com/xdata/images/hotel/square600/683816482.webp?k=9b4d7f5b8aec06d54c4d8dc765559c8e41a45d6c1b1701550df331d63ce29e13&o=',
    ownerId: '2',
    rating: 4.9
  },
  {
    id: 'c2',
    title: 'Mountain Nest',
    description: 'Cozy wooden cabin nestled in the mountains with breathtaking views of the lake and Tian Shan peaks.',
    location: 'Karakol, Issyk-Kul',
    pricePerNight: 95,
    capacity: 4,
    bedrooms: 2,
    amenities: ['WiFi', 'Hiking Trails', 'Fire Pit', 'Terrace'],
    image: 'https://cf.bstatic.com/xdata/images/hotel/square600/362984467.webp?k=01caed57dca0a9340d35023a731f4164276f1587447405205f2a8c16a19238b9&o=',
    ownerId: '2',
    rating: 4.7
  },
  {
    id: 'c3',
    title: 'Golden Shore Villa',
    description: 'Luxurious villa right on the golden sands of Issyk-Kul. Perfect for families and groups.',
    location: 'Balykchy, Issyk-Kul',
    pricePerNight: 220,
    capacity: 8,
    bedrooms: 4,
    amenities: ['Private Pool', 'WiFi', 'Kitchen', 'Boat Rental', 'AC'],
    image: 'https://cf.bstatic.com/xdata/images/hotel/square600/53130073.webp?k=97e9660430eea70f83b4aec4a7248ff2ee255a4f10dd4dd10b5a22af58784402&o=',
    ownerId: '1',
    rating: 4.8
  },
  {
    id: 'c4',
    title: 'Eagle Cliff Retreat',
    description: 'Secluded cottage perched on a cliff with incredible sunrise views over the lake.',
    location: 'Jeti-Oguz, Issyk-Kul',
    pricePerNight: 110,
    capacity: 5,
    bedrooms: 2,
    amenities: ['Hot Tub', 'Hammock', 'WiFi', 'Yoga Deck'],
    image: 'https://cf.bstatic.com/xdata/images/hotel/square600/416526255.webp?k=aace980eb669f57590b64613063d43d4e0308e7a8cbe05059343a9037ddb22eb&o=',
    ownerId: '2',
    rating: 5.0
  },
  {
    id: 'c5',
    title: 'Blue Horizon Cottage',
    description: 'Modern eco-friendly cottage with direct lake access and sustainable features.',
    location: 'Tup, Issyk-Kul',
    pricePerNight: 75,
    capacity: 3,
    bedrooms: 1,
    amenities: ['WiFi', 'Kayaks', 'Solar Power', 'Patio'],
    image: 'https://cf.bstatic.com/xdata/images/hotel/square600/364105810.webp?k=bcf7c90b87fd1e709561004fc502fe161857ca29ac5421a9a7172d3c5effe067&o=',
    ownerId: '1',
    rating: 4.6
  },
  {
    id: 'c6',
    title: 'Family Paradise',
    description: 'Spacious family-friendly home with playground and large garden near the lake.',
    location: 'Cholpon-Ata, Issyk-Kul',
    pricePerNight: 165,
    capacity: 10,
    bedrooms: 5,
    amenities: ['WiFi', 'Playground', 'Grill', 'Ping Pong', 'Lake View'],
    image: 'https://cf.bstatic.com/xdata/images/hotel/square600/666727425.webp?k=8ccbd357d5100a9019532d559aafd05e8b9fcaffaa4e791eaea0a13665a8dfc4&o=',
    ownerId: '2',
    rating: 4.4
  }
];

export const mockBookings: Booking[] = [
  {
    id: 'b1',
    cottageId: 'c1',
    userId: '3',
    checkIn: '2026-07-15',
    checkOut: '2026-07-22',
    guests: 4,
    totalPrice: 1015,
    status: 'confirmed',
  },
  {
    id: 'b2',
    cottageId: 'c4',
    userId: '3',
    checkIn: '2026-08-05',
    checkOut: '2026-08-10',
    guests: 2,
    totalPrice: 550,
    status: 'confirmed',
  }
];