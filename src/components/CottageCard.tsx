import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Users, Bed, Star } from 'lucide-react';
import { Cottage } from '../types';

interface CottageCardProps {
  cottage: Cottage;
  isOwner?: boolean;
  onDelete?: (id: string) => void;
}

const CottageCard: React.FC<CottageCardProps> = ({ cottage, isOwner = false, onDelete }) => {
  return (
    <div className="group bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full">
      <div className="relative">
        <img 
          src={cottage.image} 
          alt={cottage.title}
          className="w-full h-56 object-cover transition-transform group-hover:scale-105 duration-700"
        />
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-2xl text-xs font-mono flex items-center gap-1 shadow">
          <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
          {cottage.rating}
        </div>
        <div className="absolute bottom-4 left-4 bg-white text-teal-700 text-xs font-semibold px-3 py-1 rounded-2xl shadow">
          ${cottage.pricePerNight} <span className="font-normal text-slate-500">night</span>
        </div>
      </div>
      
      <div className="p-6 flex-1 flex flex-col">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-xl leading-none text-slate-900">{cottage.title}</h3>
        </div>
        
        <div className="flex items-center gap-1 text-slate-500 text-sm mb-4">
          <MapPin className="w-3.5 h-3.5" />
          {cottage.location}
        </div>

        <p className="text-slate-600 text-[13px] line-clamp-2 mb-6 flex-1">
          {cottage.description}
        </p>

        <div className="flex items-center justify-between text-xs border-t pt-5 text-slate-500">
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-1">
              <Users className="w-3.5 h-3.5" />
              {cottage.capacity}
            </div>
            <div className="flex items-center gap-1">
              <Bed className="w-3.5 h-3.5" />
              {cottage.bedrooms}
            </div>
          </div>
          
          <div className="flex gap-2">
            <Link 
              to={`/cottages/${cottage.id}`}
              className="text-teal-600 hover:text-teal-700 font-medium text-xs px-5 py-2 border border-teal-200 hover:border-teal-300 rounded-2xl transition-colors"
            >
              View details
            </Link>
            
            {isOwner && onDelete && (
              <button 
                onClick={() => onDelete(cottage.id)}
                className="text-red-400 hover:text-red-500 px-3 py-2 text-xs border border-red-100 hover:border-red-200 rounded-2xl transition-colors"
              >
                Delete
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CottageCard;