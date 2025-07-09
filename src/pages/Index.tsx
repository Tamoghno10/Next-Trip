import React, { useState } from 'react';
import { Calendar, MapPin, Users, Search, Star, Plane, Building, Package, CreditCard, User, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import AuthModal from '@/components/AuthModal';
import PaymentModal from '@/components/PaymentModal';
import SearchResults from '@/components/SearchResults';
import AIChatBox from '@/components/AIChatBox';

const Index = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [searchResults, setSearchResults] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const { toast } = useToast();

  const handleSearch = (searchType: string, searchData: any) => {
    // Mock search functionality
    const mockResults = {
      flights: [
        { id: 1, from: 'Delhi', to: 'Mumbai', price: 4500, airline: 'SpiceJet', duration: '2h 15m', departure: '08:30', arrival: '10:45' },
        { id: 2, from: 'Delhi', to: 'Mumbai', price: 5200, airline: 'IndiGo', duration: '2h 10m', departure: '14:20', arrival: '16:30' },
        { id: 3, from: 'Delhi', to: 'Mumbai', price: 4800, airline: 'Air India', duration: '2h 25m', departure: '18:15', arrival: '20:40' },
      ],
      hotels: [
        { id: 1, name: 'Grand Plaza Hotel', location: 'Mumbai', price: 3500, rating: 4.5, amenities: ['WiFi', 'Pool', 'Spa'] },
        { id: 2, name: 'Luxury Suites', location: 'Mumbai', price: 5500, rating: 4.8, amenities: ['WiFi', 'Gym', 'Restaurant'] },
        { id: 3, name: 'Business Hotel', location: 'Mumbai', price: 2800, rating: 4.2, amenities: ['WiFi', 'Business Center'] },
      ],
      packages: [
        { id: 1, name: 'Goa Beach Paradise', duration: '5 Days', price: 15000, rating: 4.6, includes: ['Flight', 'Hotel', 'Meals'] },
        { id: 2, name: 'Kerala Backwaters', duration: '7 Days', price: 22000, rating: 4.7, includes: ['Flight', 'Houseboat', 'Meals'] },
        { id: 3, name: 'Rajasthan Heritage', duration: '6 Days', price: 18500, rating: 4.5, includes: ['Flight', 'Hotel', 'Sightseeing'] },
      ]
    };
    
    setSearchResults(mockResults[searchType] || []);
    toast({
      title: "Search Results",
      description: `Found ${mockResults[searchType]?.length || 0} ${searchType} for your search.`,
    });
  };

  const handleBooking = (item: any) => {
    if (!isLoggedIn) {
      setIsAuthModalOpen(true);
      return;
    }
    setIsPaymentModalOpen(true);
  };

  const handleLogin = (email: string) => {
    setIsLoggedIn(true);
    setUserEmail(email);
    setIsAuthModalOpen(false);
    toast({
      title: "Login Successful",
      description: `Welcome back, ${email}!`,
    });
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserEmail('');
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-orange-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Plane className="h-8 w-8 text-blue-600 mr-2" />
              <span className="text-2xl font-bold text-gray-900">TravelEase</span>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">Flights</a>
              <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">Hotels</a>
              <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">Holiday Packages</a>
              <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">Offers</a>
              <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">Support</a>
            </nav>

            {/* User Actions */}
            <div className="flex items-center space-x-4">
              {isLoggedIn ? (
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-700">Hello, {userEmail.split('@')[0]}</span>
                  <Button variant="outline" size="sm" onClick={handleLogout}>
                    Logout
                  </Button>
                </div>
              ) : (
                <Button onClick={() => setIsAuthModalOpen(true)} variant="outline" size="sm">
                  <User className="h-4 w-4 mr-2" />
                  Login
                </Button>
              )}
              
              {/* Mobile menu button */}
              <Button
                variant="ghost"
                size="sm"
                className="md:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a href="#" className="block px-3 py-2 text-gray-700 hover:text-blue-600">Flights</a>
              <a href="#" className="block px-3 py-2 text-gray-700 hover:text-blue-600">Hotels</a>
              <a href="#" className="block px-3 py-2 text-gray-700 hover:text-blue-600">Holiday Packages</a>
              <a href="#" className="block px-3 py-2 text-gray-700 hover:text-blue-600">Offers</a>
              <a href="#" className="block px-3 py-2 text-gray-700 hover:text-blue-600">Support</a>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section with Search */}
      <section className="relative bg-gradient-to-r from-blue-600 to-orange-500 text-white py-20">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Discover Your Next Adventure
            </h1>
            <p className="text-xl md:text-2xl opacity-90">
              Find flights, hotels, and holiday packages at the best prices
            </p>
          </div>

          {/* Search Tabs */}
          <Card className="max-w-4xl mx-auto">
            <CardContent className="p-6">
              <Tabs defaultValue="flights" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="flights" className="flex items-center gap-2">
                    <Plane className="h-4 w-4" />
                    Flights
                  </TabsTrigger>
                  <TabsTrigger value="hotels" className="flex items-center gap-2">
                    <Building className="h-4 w-4" />
                    Hotels
                  </TabsTrigger>
                  <TabsTrigger value="packages" className="flex items-center gap-2">
                    <Package className="h-4 w-4" />
                    Packages
                  </TabsTrigger>
                </TabsList>

                {/* Flight Search */}
                <TabsContent value="flights" className="mt-6">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <Label htmlFor="from">From</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select city" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="delhi">Delhi</SelectItem>
                          <SelectItem value="mumbai">Mumbai</SelectItem>
                          <SelectItem value="bangalore">Bangalore</SelectItem>
                          <SelectItem value="chennai">Chennai</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="to">To</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select city" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="mumbai">Mumbai</SelectItem>
                          <SelectItem value="delhi">Delhi</SelectItem>
                          <SelectItem value="goa">Goa</SelectItem>
                          <SelectItem value="kerala">Kerala</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="departure">Departure</Label>
                      <Input type="date" id="departure" />
                    </div>
                    <div>
                      <Label htmlFor="passengers">Passengers</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="1 Adult" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 Adult</SelectItem>
                          <SelectItem value="2">2 Adults</SelectItem>
                          <SelectItem value="3">3 Adults</SelectItem>
                          <SelectItem value="4">4 Adults</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <Button 
                    className="w-full mt-4 bg-blue-600 hover:bg-blue-700" 
                    onClick={() => handleSearch('flights', {})}
                  >
                    <Search className="h-4 w-4 mr-2" />
                    Search Flights
                  </Button>
                </TabsContent>

                {/* Hotel Search */}
                <TabsContent value="hotels" className="mt-6">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <Label htmlFor="city">City</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select city" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="mumbai">Mumbai</SelectItem>
                          <SelectItem value="delhi">Delhi</SelectItem>
                          <SelectItem value="goa">Goa</SelectItem>
                          <SelectItem value="kerala">Kerala</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="checkin">Check-in</Label>
                      <Input type="date" id="checkin" />
                    </div>
                    <div>
                      <Label htmlFor="checkout">Check-out</Label>
                      <Input type="date" id="checkout" />
                    </div>
                    <div>
                      <Label htmlFor="guests">Guests</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="2 Guests" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 Guest</SelectItem>
                          <SelectItem value="2">2 Guests</SelectItem>
                          <SelectItem value="3">3 Guests</SelectItem>
                          <SelectItem value="4">4 Guests</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <Button 
                    className="w-full mt-4 bg-blue-600 hover:bg-blue-700"
                    onClick={() => handleSearch('hotels', {})}
                  >
                    <Search className="h-4 w-4 mr-2" />
                    Search Hotels
                  </Button>
                </TabsContent>

                {/* Package Search */}
                <TabsContent value="packages" className="mt-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="destination">Destination</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select destination" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="goa">Goa</SelectItem>
                          <SelectItem value="kerala">Kerala</SelectItem>
                          <SelectItem value="rajasthan">Rajasthan</SelectItem>
                          <SelectItem value="himachal">Himachal Pradesh</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="duration">Duration</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select duration" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="3-5">3-5 Days</SelectItem>
                          <SelectItem value="5-7">5-7 Days</SelectItem>
                          <SelectItem value="7-10">7-10 Days</SelectItem>
                          <SelectItem value="10+">10+ Days</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="budget">Budget</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select budget" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="budget">Budget (₹10,000-₹20,000)</SelectItem>
                          <SelectItem value="standard">Standard (₹20,000-₹40,000)</SelectItem>
                          <SelectItem value="premium">Premium (₹40,000+)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <Button 
                    className="w-full mt-4 bg-blue-600 hover:bg-blue-700"
                    onClick={() => handleSearch('packages', {})}
                  >
                    <Search className="h-4 w-4 mr-2" />
                    Search Packages
                  </Button>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Search Results */}
      {searchResults && (
        <SearchResults 
          results={searchResults} 
          onBooking={handleBooking}
        />
      )}

      {/* Special Offers */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Special Offers</h2>
            <p className="text-lg text-gray-600">Don't miss out on these amazing deals!</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white p-4 rounded-lg mb-4">
                  <h3 className="text-xl font-bold mb-2">Flight Sale</h3>
                  <p className="text-sm">Up to 40% off on domestic flights</p>
                </div>
                <p className="text-gray-600 mb-4">Book now and save big on your next trip!</p>
                <Badge variant="secondary">Valid till Dec 31</Badge>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white p-4 rounded-lg mb-4">
                  <h3 className="text-xl font-bold mb-2">Hotel Deals</h3>
                  <p className="text-sm">Get extra 25% off on hotel bookings</p>
                </div>
                <p className="text-gray-600 mb-4">Luxury stays at unbeatable prices!</p>
                <Badge variant="secondary">Limited time</Badge>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="bg-gradient-to-r from-green-500 to-teal-500 text-white p-4 rounded-lg mb-4">
                  <h3 className="text-xl font-bold mb-2">Package Tours</h3>
                  <p className="text-sm">Complete packages starting ₹9,999</p>
                </div>
                <p className="text-gray-600 mb-4">All-inclusive deals for memorable vacations!</p>
                <Badge variant="secondary">Book today</Badge>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Popular Destinations</h2>
            <p className="text-lg text-gray-600">Explore the most loved travel destinations</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'Goa', image: 'photo-1500375592092-40eb2168fd21', description: 'Beaches & Nightlife' },
              { name: 'Kerala', image: 'photo-1482938289607-e9573fc25ebb', description: 'Backwaters & Nature' },
              { name: 'Rajasthan', image: 'photo-1469474968028-56623f02e42e', description: 'Heritage & Culture' },
              { name: 'Himachal', image: 'photo-1472396961693-142e6e269027', description: 'Mountains & Adventure' }
            ].map((destination) => (
              <Card key={destination.name} className="group cursor-pointer hover:shadow-lg transition-all duration-300">
                <div className="relative h-48 overflow-hidden rounded-t-lg">
                  <img 
                    src={`https://images.unsplash.com/${destination.image}?w=400&h=200&fit=crop`}
                    alt={destination.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-xl font-bold">{destination.name}</h3>
                    <p className="text-sm opacity-90">{destination.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <Plane className="h-8 w-8 text-blue-400 mr-2" />
                <span className="text-xl font-bold">TravelEase</span>
              </div>
              <p className="text-gray-400">Your trusted travel companion for unforgettable journeys.</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms & Conditions</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Flight Booking</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Hotel Booking</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Holiday Packages</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Car Rentals</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">24/7 Support</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Cancellation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Refunds</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 TravelEase. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)}
        onLogin={handleLogin}
      />
      
      <PaymentModal 
        isOpen={isPaymentModalOpen} 
        onClose={() => setIsPaymentModalOpen(false)}
      />

      {/* AI Chatbox */}
      <AIChatBox />
    </div>
  );
};

export default Index;
