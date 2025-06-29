import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import LocationSearch from './LocationSearch';
import { useSearch } from '@/contexts/SearchContext';
import { Badge } from "@/components/ui/badge";
import { Menu, X } from "lucide-react";

const StickyNavigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { isSearchFocused } = useSearch();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = window.innerHeight * 0.7; // Approximate hero section height
      setIsScrolled(window.scrollY > heroHeight);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className="bg-white/95 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-700 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">RH</span>
            </div>
            <span className="text-xl font-bold text-gray-900">Real Estate Hotspot</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
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

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-3">
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
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

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
