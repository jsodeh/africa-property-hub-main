import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Shield, MessageSquare, CreditCard, MapPin, Users, Star, CheckCircle, Bed, Bath, Square, X, Phone, Mail, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import StickyNavigation from "@/components/StickyNavigation";
import LocationSearch from "@/components/LocationSearch";
import { SearchProvider, useSearch } from "@/contexts/SearchContext";
import { useState, useEffect } from "react";

// Sample properties for preview
const featuredProperties = [
  {
    id: 1,
    title: "Modern 3-Bedroom Apartment",
    location: "Victoria Island, Lagos",
    price: "₦45,000,000",
    bedrooms: 3,
    bathrooms: 2,
    area: "150 sqm",
    image: "/placeholder.svg",
    images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
    type: "For Sale",
    description: "Stunning modern apartment with panoramic views of Lagos lagoon. Features high-end finishes, smart home technology, and access to premium amenities including gym, pool, and 24/7 security.",
    agent: {
      name: "Sarah Johnson",
      phone: "+234 801 234 5678",
      email: "sarah.johnson@realestate.com",
      image: "/placeholder.svg"
    },
    features: ["Swimming Pool", "Gym", "24/7 Security", "Generator", "Elevator", "Parking"],
    yearBuilt: 2022,
    floors: 2,
    furnished: "Fully Furnished"
  },
  {
    id: 2,
    title: "Luxury 4-Bedroom Duplex",
    location: "Lekki Phase 1, Lagos",
    price: "₦75,000,000",
    bedrooms: 4,
    bathrooms: 3,
    area: "250 sqm",
    image: "/placeholder.svg",
    images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
    type: "For Sale",
    description: "Beautifully designed duplex in a serene and secure estate. Perfect for families with spacious rooms, modern kitchen, and landscaped garden. Close to schools, shopping centers, and recreational facilities.",
    agent: {
      name: "Michael Adebayo",
      phone: "+234 802 345 6789",
      email: "michael.adebayo@realestate.com",
      image: "/placeholder.svg"
    },
    features: ["Garden", "Security", "Generator", "Parking", "Balcony", "Storage Room"],
    yearBuilt: 2021,
    floors: 3,
    furnished: "Semi Furnished"
  },
  {
    id: 3,
    title: "Executive 2-Bedroom Flat",
    location: "Ikeja GRA, Lagos",
    price: "₦25,000,000",
    bedrooms: 2,
    bathrooms: 2,
    area: "120 sqm",
    image: "/placeholder.svg",
    images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
    type: "For Sale",
    description: "Well-maintained apartment in one of Lagos premier residential areas. Features include spacious living areas, fitted kitchen, and access to estate facilities. Ideal for young professionals and small families.",
    agent: {
      name: "Fatima Hassan",
      phone: "+234 803 456 7890",
      email: "fatima.hassan@realestate.com",
      image: "/placeholder.svg"
    },
    features: ["Security", "Generator", "Parking", "Water Treatment"],
    yearBuilt: 2020,
    floors: 1,
    furnished: "Unfurnished"
  },
  {
    id: 4,
    title: "Ultra-Luxury 5-Bedroom Mansion",
    location: "Banana Island, Lagos",
    price: "₦250,000,000",
    bedrooms: 5,
    bathrooms: 4,
    area: "400 sqm",
    image: "/placeholder.svg",
    images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg", "/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
    type: "For Sale",
    description: "Ultra-luxury mansion on exclusive Banana Island. Features include private beach access, infinity pool, home theater, wine cellar, and staff quarters. The epitome of luxury living in Lagos.",
    agent: {
      name: "David Okonkwo",
      phone: "+234 804 567 8901",
      email: "david.okonkwo@realestate.com",
      image: "/placeholder.svg"
    },
    features: ["Private Beach", "Infinity Pool", "Home Theater", "Wine Cellar", "Staff Quarters", "Private Jetty"],
    yearBuilt: 2023,
    floors: 4,
    furnished: "Fully Furnished"
  },
  {
    id: 5,
    title: "Contemporary 3-Bedroom Penthouse",
    location: "Ikoyi, Lagos",
    price: "₦85,000,000",
    bedrooms: 3,
    bathrooms: 3,
    area: "200 sqm",
    image: "/placeholder.svg",
    images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
    type: "For Sale",
    description: "Exclusive penthouse with 360-degree views of Lagos. Features floor-to-ceiling windows, marble finishes, private elevator access, and rooftop terrace. Located in the heart of Ikoyi with easy access to business district.",
    agent: {
      name: "Grace Okechukwu",
      phone: "+234 805 678 9012",
      email: "grace.okechukwu@realestate.com",
      image: "/placeholder.svg"
    },
    features: ["Private Elevator", "Rooftop Terrace", "Marble Finishes", "Central AC", "Security", "Parking"],
    yearBuilt: 2022,
    floors: 2,
    furnished: "Luxury Furnished"
  },
  {
    id: 6,
    title: "Elegant 4-Bedroom Terrace",
    location: "Abuja, FCT",
    price: "₦55,000,000",
    bedrooms: 4,
    bathrooms: 3,
    area: "180 sqm",
    image: "/placeholder.svg",
    images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
    type: "For Sale",
    description: "Modern terrace house in upscale Abuja neighborhood. Features contemporary design, landscaped compound, and proximity to international schools and shopping centers. Perfect for expatriate families.",
    agent: {
      name: "Aisha Bello",
      phone: "+234 806 789 0123",
      email: "aisha.bello@realestate.com",
      image: "/placeholder.svg"
    },
    features: ["Landscaped Garden", "Security", "Generator", "Parking", "Study Room"],
    yearBuilt: 2021,
    floors: 2,
    furnished: "Semi Furnished"
  },
  {
    id: 7,
    title: "Spacious 3-Bedroom Townhouse",
    location: "Port Harcourt, Rivers",
    price: "₦35,000,000",
    bedrooms: 3,
    bathrooms: 2,
    area: "160 sqm",
    image: "/placeholder.svg",
    images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
    type: "For Sale",
    description: "Beautiful townhouse in a quiet residential area. Features include a private garden, modern kitchen, and spacious living areas. Close to shopping centers and schools.",
    agent: {
      name: "Emeka Nwachukwu",
      phone: "+234 807 890 1234",
      email: "emeka.nwachukwu@realestate.com",
      image: "/placeholder.svg"
    },
    features: ["Private Garden", "Security", "Generator", "Parking", "Balcony"],
    yearBuilt: 2020,
    floors: 2,
    furnished: "Semi Furnished"
  },
  {
    id: 8,
    title: "Modern 2-Bedroom Apartment",
    location: "Kano, Nigeria",
    price: "₦18,000,000",
    bedrooms: 2,
    bathrooms: 2,
    area: "100 sqm",
    image: "/placeholder.svg",
    images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
    type: "For Sale",
    description: "Contemporary apartment with modern amenities. Features include fitted kitchen, spacious bedrooms, and access to community facilities. Ideal for young professionals.",
    agent: {
      name: "Hassan Yusuf",
      phone: "+234 808 901 2345",
      email: "hassan.yusuf@realestate.com",
      image: "/placeholder.svg"
    },
    features: ["Security", "Generator", "Parking", "Water Treatment"],
    yearBuilt: 2021,
    floors: 1,
    furnished: "Unfurnished"
  }
];

const HeroSection = () => {
  const { isSearchFocused } = useSearch();

  return (
    <section className="relative min-h-screen flex items-center">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/real-estate.jpg')`
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      </div>
      
      {/* Hero Content */}
      <div className="relative z-10 container mx-auto px-4">
        <div className="max-w-4xl">
          <div className="text-left mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Agents. Tours.
              <br />
              Loans. Homes.
            </h1>
          </div>

          {/* Left-aligned Search Bar on Hero */}
          <div className="mb-8">
            <LocationSearch 
              placeholder="Enter an address, neighborhood, city, or ZIP code"
              className="max-w-2xl"
              onLocationSelect={(location) => {
                console.log('Hero search location selected:', location);
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

const Index = () => {
  const [selectedProperty, setSelectedProperty] = useState<any>(null);
  const [showPropertyModal, setShowPropertyModal] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showSearchInNav, setShowSearchInNav] = useState(false);

  // Handle scroll to show/hide search in navigation
  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = window.innerHeight * 0.8; // Hero section height
      const scrollPosition = window.scrollY;
      
      setIsScrolled(scrollPosition > 100);
      setShowSearchInNav(scrollPosition > heroHeight);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handlePropertyClick = (property: any) => {
    setSelectedProperty(property);
    setSelectedImageIndex(0); // Reset to first image when opening modal
    setShowPropertyModal(true);
  };

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index);
  };

  return (
    <SearchProvider>
      <div className="min-h-screen bg-white">
        <StickyNavigation isScrolled={isScrolled} showSearchInNav={showSearchInNav} />
        <HeroSection />

        {/* Quick Access Cards */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <Card className="text-center hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="h-8 w-8 text-blue-700" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Buy a home</h3>
                  <p className="text-gray-600 text-sm mb-4">Find your place with an immersive photo experience and the most listings</p>
                  <Link to="/properties">
                    <Button variant="outline" size="sm">Browse homes</Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Sell a home</h3>
                  <p className="text-gray-600 text-sm mb-4">No matter what path you take to sell your home, we can help you navigate</p>
                  <Button variant="outline" size="sm">See your options</Button>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CreditCard className="h-8 w-8 text-purple-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Rent a home</h3>
                  <p className="text-gray-600 text-sm mb-4">We're creating a seamless online experience – from shopping to applying</p>
                  <Button variant="outline" size="sm">Find rentals</Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Featured Properties Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                    Homes for you
                  </h2>
                  <p className="text-gray-600">Based on your recent activity</p>
                </div>
                <Link to="/properties">
                  <Button variant="outline">View all</Button>
                </Link>
              </div>

              <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
                {featuredProperties.map((property) => (
                  <Card 
                    key={property.id} 
                    className="hover:shadow-lg transition-shadow group cursor-pointer min-w-[320px] flex-shrink-0"
                    onClick={() => handlePropertyClick(property)}
                  >
                    <div className="relative">
                      <img 
                        src={property.image} 
                        alt={property.title} 
                        className="w-full h-48 object-cover rounded-t-lg"
                      />
                      <Badge className="absolute top-3 left-3 bg-blue-700 text-white border-0">
                        {property.type}
                      </Badge>
                    </div>
                    
                    <CardContent className="p-4">
                      <div className="mb-3">
                        <span className="text-2xl font-bold text-gray-900">{property.price}</span>
                      </div>
                      
                      <div className="flex items-center space-x-4 text-gray-600 mb-3">
                        <div className="flex items-center">
                          <Bed className="h-4 w-4 mr-1" />
                          <span className="text-sm">{property.bedrooms} bed</span>
                        </div>
                        <div className="flex items-center">
                          <Bath className="h-4 w-4 mr-1" />
                          <span className="text-sm">{property.bathrooms} bath</span>
                        </div>
                        <div className="flex items-center">
                          <Square className="h-4 w-4 mr-1" />
                          <span className="text-sm">{property.area}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center text-gray-600 mb-3">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span className="text-sm">{property.location}</span>
                      </div>
                      
                      <h3 className="font-medium text-gray-900 group-hover:text-blue-700 transition-colors">
                        {property.title}
                      </h3>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Property Details Modal */}
        {showPropertyModal && selectedProperty && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="relative">
                <img 
                  src={selectedProperty.images[selectedImageIndex]} 
                  alt={selectedProperty.title} 
                  className="w-full h-64 object-cover rounded-t-lg"
                />
                <button
                  onClick={() => setShowPropertyModal(false)}
                  className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2 hover:bg-white transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
                <Badge className="absolute top-4 left-4 bg-blue-700 text-white border-0">
                  {selectedProperty.type}
                </Badge>
              </div>

              {/* Image Gallery */}
              {selectedProperty.images && selectedProperty.images.length > 1 && (
                <div className="px-6 py-4 border-b">
                  <h3 className="text-sm font-medium text-gray-700 mb-3">Property Images</h3>
                  <div className="flex gap-3 overflow-x-auto scrollbar-hide">
                    {selectedProperty.images.map((image: string, index: number) => (
                      <button
                        key={index}
                        onClick={() => handleImageClick(index)}
                        className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                          selectedImageIndex === index 
                            ? 'border-blue-500 ring-2 ring-blue-200' 
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <img 
                          src={image} 
                          alt={`${selectedProperty.title} - Image ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedProperty.title}</h2>
                    <p className="text-3xl font-bold text-blue-600 mb-2">{selectedProperty.price}</p>
                    <div className="flex items-center text-gray-600 mb-4">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>{selectedProperty.location}</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Property Details</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Bedrooms:</span>
                        <span className="font-medium">{selectedProperty.bedrooms}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Bathrooms:</span>
                        <span className="font-medium">{selectedProperty.bathrooms}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Area:</span>
                        <span className="font-medium">{selectedProperty.area}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Year Built:</span>
                        <span className="font-medium">{selectedProperty.yearBuilt}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Floors:</span>
                        <span className="font-medium">{selectedProperty.floors}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Furnished:</span>
                        <span className="font-medium">{selectedProperty.furnished}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Features</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {selectedProperty.features.map((feature: string, index: number) => (
                        <div key={index} className="flex items-center text-sm text-gray-600">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
                  <p className="text-gray-600 leading-relaxed">{selectedProperty.description}</p>
                </div>

                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Agent</h3>
                  <div className="flex items-center space-x-4 mb-4">
                    <img 
                      src={selectedProperty.agent.image} 
                      alt={selectedProperty.agent.name} 
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <h4 className="font-medium text-gray-900">{selectedProperty.agent.name}</h4>
                      <p className="text-sm text-gray-600">Real Estate Agent</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Button className="flex-1" onClick={() => window.open(`tel:${selectedProperty.agent.phone}`)}>
                      <Phone className="h-4 w-4 mr-2" />
                      Call
                    </Button>
                    <Button variant="outline" className="flex-1" onClick={() => window.open(`mailto:${selectedProperty.agent.email}`)}>
                      <Mail className="h-4 w-4 mr-2" />
                      Email
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <Calendar className="h-4 w-4 mr-2" />
                      Schedule Viewing
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Key Features */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-blue-100 text-blue-700 border-0">Why Choose Us</Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Safe, Smart, and Secure Real Estate
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                We've built Nigeria's most comprehensive real estate platform with your safety and success in mind.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <Card className="text-center hover:shadow-lg transition-shadow p-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-blue-700" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Verified Listings</h3>
                <p className="text-gray-600">
                  Every property and agent is thoroughly verified with proper documentation and KYC checks.
                </p>
              </Card>

              <Card className="text-center hover:shadow-lg transition-shadow p-6">
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageSquare className="h-8 w-8 text-amber-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Safe Communication</h3>
                <p className="text-gray-600">
                  In-app messaging keeps your personal information private while facilitating smooth negotiations.
                </p>
              </Card>

              <Card className="text-center hover:shadow-lg transition-shadow p-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CreditCard className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Escrow Payments</h3>
                <p className="text-gray-600">
                  Secure escrow system protects your deposits and ensures safe transactions for all parties.
                </p>
              </Card>

              <Card className="text-center hover:shadow-lg transition-shadow p-6">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Expert Services</h3>
                <p className="text-gray-600">
                  Access to vetted lawyers, surveyors, and other professionals for complete real estate support.
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-blue-700">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Transform Your Real Estate Experience?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join thousands of Nigerians who are already using Real Estate Hotspot for safer, smarter property transactions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/signup">
                <Button size="lg" className="bg-amber-500 hover:bg-amber-600 text-white px-8 py-6 text-lg">
                  Get Started for Free
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-700 px-8 py-6 text-lg">
                Learn More
              </Button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-8 h-8 bg-blue-700 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">RH</span>
                  </div>
                  <span className="text-xl font-bold">Real Estate Hotspot</span>
                </div>
                <p className="text-gray-400">
                  Nigeria's most trusted real estate platform, connecting buyers, sellers, and service providers safely.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-4">For Buyers</h3>
                <ul className="space-y-2 text-gray-400">
                  <li><Link to="/properties" className="hover:text-white transition-colors">Browse Properties</Link></li>
                  <li><Link to="/agents" className="hover:text-white transition-colors">Find Agents</Link></li>
                  <li><Link to="/services" className="hover:text-white transition-colors">Professional Services</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-4">For Professionals</h3>
                <ul className="space-y-2 text-gray-400">
                  <li><Link to="/list-property" className="hover:text-white transition-colors">List Property</Link></li>
                  <li><Link to="/agent-signup" className="hover:text-white transition-colors">Become an Agent</Link></li>
                  <li><Link to="/service-provider" className="hover:text-white transition-colors">Offer Services</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-4">Support</h3>
                <ul className="space-y-2 text-gray-400">
                  <li><Link to="/help" className="hover:text-white transition-colors">Help Center</Link></li>
                  <li><Link to="/safety" className="hover:text-white transition-colors">Safety Guide</Link></li>
                  <li><Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
              <p>&copy; 2024 Real Estate Hotspot. All rights reserved. Made with ❤️ in Nigeria.</p>
            </div>
          </div>
        </footer>
      </div>
    </SearchProvider>
  );
};

export default Index;