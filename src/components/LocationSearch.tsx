
import React, { useState, useEffect, useRef } from 'react';
import { Search, MapPin, X } from 'lucide-react';
import { useSearch } from '@/contexts/SearchContext';

interface LocationSearchProps {
  placeholder?: string;
  className?: string;
  onLocationSelect?: (location: string) => void;
}

// Sample Nigerian cities and areas for autocomplete
const nigerianLocations = [
  'Lagos, Nigeria',
  'Victoria Island, Lagos',
  'Ikoyi, Lagos',
  'Lekki, Lagos',
  'Surulere, Lagos',
  'Ikeja, Lagos',
  'Yaba, Lagos',
  'Abuja, Nigeria',
  'Garki, Abuja',
  'Maitama, Abuja',
  'Wuse, Abuja',
  'Asokoro, Abuja',
  'Port Harcourt, Rivers',
  'Kano, Nigeria',
  'Ibadan, Oyo',
  'Benin City, Edo',
  'Enugu, Nigeria',
  'Calabar, Cross River',
  'Jos, Plateau',
  'Kaduna, Nigeria'
];

const LocationSearch = ({ placeholder = "Enter an address, neighborhood, city, or ZIP code", className = "", onLocationSelect }: LocationSearchProps) => {
  const { searchQuery, setSearchQuery, isSearchFocused, setIsSearchFocused, suggestions, setSuggestions } = useSearch();
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (searchQuery.length > 1) {
      const filtered = nigerianLocations.filter(location =>
        location.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSuggestions(filtered.slice(0, 6));
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchQuery, setSuggestions]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
        setIsSearchFocused(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [setIsSearchFocused]);

  const handleInputFocus = () => {
    setIsSearchFocused(true);
    if (suggestions.length > 0) {
      setShowSuggestions(true);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion);
    setShowSuggestions(false);
    setIsSearchFocused(false);
    onLocationSelect?.(suggestion);
  };

  const handleClear = () => {
    setSearchQuery('');
    setSuggestions([]);
    setShowSuggestions(false);
    inputRef.current?.focus();
  };

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <div className="flex items-center">
        <div className="relative flex-1">
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 z-10" />
          <input
            ref={inputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={handleInputFocus}
            placeholder={placeholder}
            className="w-full pl-12 pr-12 py-3 text-lg border-2 border-blue-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
          />
          {searchQuery && (
            <button
              onClick={handleClear}
              className="absolute right-12 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-100 rounded-full z-10"
            >
              <X className="h-4 w-4 text-gray-400" />
            </button>
          )}
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        </div>
      </div>

      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg mt-1 z-50 max-h-80 overflow-y-auto">
          <div className="py-2">
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center space-x-3 transition-colors"
              >
                <MapPin className="h-4 w-4 text-gray-400 flex-shrink-0" />
                <span className="text-gray-900">{suggestion}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LocationSearch;
