import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import LocationSearch from './LocationSearch';
import { useSearch } from '@/contexts/SearchContext';
import { Badge } from "@/components/ui/badge";
import { Menu, X } from "lucide-react";

interface StickyNavigationProps {
  isScrolled?: boolean;
  showSearchInNav?: boolean;
}

const StickyNavigation = ({ isScrolled = false, showSearchInNav = false }: StickyNavigationProps) => {
  const { isSearchFocused } = useSearch();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className={`bg-white/95 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-50 transition-all duration-300 ${
      isScrolled ? 'shadow-md' : ''
    }`}>
      <div className="container mx-auto px-4 py-4">
        <div className={`flex items-center ${showSearchInNav ? 'justify-between' : 'justify-center md:justify-between'}`}>
          {/* Logo - Center on hero, left when scrolled */}
          <Link to="/" className={`flex items-center space-x-2 ${
            showSearchInNav ? 'order-1' : 'order-2 md:order-1'
          }`}>
            <div className="w-8 h-8 bg-blue-700 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">RH</span>
            </div>
            <span className="text-xl font-bold text-gray-900 hidden sm:block">Real Estate Hotspot</span>
          </Link>

          {/* Search Bar - Only show when scrolled */}
          {showSearchInNav && (
            <div className="order-2 flex-1 max-w-md mx-8 hidden md:block">
              <LocationSearch 
                placeholder="Enter an address, neighborhood, city..."
                className="w-full"
                onLocationSelect={(location) => {
                  console.log('Nav search location selected:', location);
                }}
              />
            </div>
          )}

          {/* Desktop Navigation - Hide when showing search */}
          {!showSearchInNav && (
            <div className="hidden md:flex items-center space-x-8 order-1 md:order-2">
              <Link to="/properties" className="text-gray-600 hover:text-blue-700 transition-colors font-medium">
                Browse Properties
              </Link>
              <Link to="/agents" className="text-gray-600 hover:text-blue-700 transition-colors">
                Find Agents
              </Link>
              <Link to="/services" className="text-gray-600 hover:text-blue-700 transition-colors">
                Services
              </Link>
              <Link to="/about" className="text-gray-600 hover:text-blue-700 transition-colors">
                About
              </Link>
            </div>
          )}

          {/* Desktop Auth Buttons */}
          <div className={`hidden md:flex items-center space-x-3 ${
            showSearchInNav ? 'order-3' : 'order-3 md:order-3'
          }`}>
            <Link to="/login">
              <Button variant="ghost" className="text-gray-600 hover:text-blue-700">
                Sign In
              </Button>
            </Link>
            <Link to="/signup">
              <Button className="bg-blue-700 hover:bg-blue-800">
                Get Started
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button variant="outline" className="border-blue-700 text-blue-700 hover:bg-blue-50">
                Dashboard
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 order-4"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Search Bar - Show when scrolled */}
        {showSearchInNav && (
          <div className="md:hidden mt-4">
            <LocationSearch 
              placeholder="Enter an address, neighborhood, city..."
              className="w-full"
              onLocationSelect={(location) => {
                console.log('Mobile nav search location selected:', location);
              }}
            />
          </div>
        )}

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-100">
            <div className="flex flex-col space-y-3 pt-4">
              <Link 
                to="/properties" 
                className="text-gray-600 hover:text-blue-700 transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Browse Properties
              </Link>
              <Link 
                to="/agents" 
                className="text-gray-600 hover:text-blue-700 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Find Agents
              </Link>
              <Link 
                to="/services" 
                className="text-gray-600 hover:text-blue-700 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Services
              </Link>
              <Link 
                to="/about" 
                className="text-gray-600 hover:text-blue-700 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <div className="pt-4 border-t border-gray-100 space-y-3">
                <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="ghost" className="w-full justify-start text-gray-600 hover:text-blue-700">
                    Sign In
                  </Button>
                </Link>
                <Link to="/signup" onClick={() => setIsMenuOpen(false)}>
                  <Button className="w-full bg-blue-700 hover:bg-blue-800">
                    Get Started
                  </Button>
                </Link>
                <Link to="/dashboard" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="outline" className="w-full border-blue-700 text-blue-700 hover:bg-blue-50">
                    Dashboard
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default StickyNavigation;