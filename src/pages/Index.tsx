
import React, { useState } from 'react';
import { Calendar, MapPin, Users, Search, Star, Plane, Building, Package, CreditCard, User, Menu, X, Train, Bus } from 'lucide-react';
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
    // Mock search functionality with new train and bus data
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
      ],
      trains: [
        { id: 1, from: 'Delhi', to: 'Mumbai', price: 1200, trainName: 'Rajdhani Express', trainNumber: '12951', duration: '16h 35m', departure: '16:55', arrival: '09:30', class: 'AC 3-Tier' },
        { id: 2, from: 'Delhi', to: 'Mumbai', price: 2100, trainName: 'Mumbai Rajdhani', trainNumber: '12953', duration: '15h 50m', departure: '17:00', arrival: '08:50', class: 'AC 2-Tier' },
        { id: 3, from: 'Delhi', to: 'Mumbai', price: 800, trainName: 'August Kranti', trainNumber: '12617', duration: '17h 30m', departure: '17:05', arrival: '10:35', class: 'Sleeper' },
      ],
      buses: [
        { id: 1, from: 'Delhi', to: 'Mumbai', price: 1800, busOperator: 'Volvo A/C Sleeper', duration: '18h 30m', departure: '18:00', arrival: '12:30', busType: 'AC Sleeper' },
        { id: 2, from: 'Delhi', to: 'Mumbai', price: 1500, busOperator: 'RedBus Express', duration: '19h 15m', departure: '19:30', arrival: '14:45', busType: 'AC Semi-Sleeper' },
        { id: 3, from: 'Delhi', to: 'Mumbai', price: 1200, busOperator: 'Travels India', duration: '20h 00m', departure: '20:00', arrival: '16:00', busType: 'Non-AC Sleeper' },
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-white booking-shadow sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="w-8 h-8 booking-gradient booking-rounded flex items-center justify-center mr-3">
                <span className="text-white font-bold text-sm">N</span>
              </div>
              <span className="text-2xl font-bold text-primary">Next Trip</span>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              <a href="#" className="text-gray-700 hover:text-primary transition-colors font-medium">Stays</a>
              <a href="#" className="text-gray-700 hover:text-primary transition-colors font-medium">Flights</a>
              <a href="#" className="text-gray-700 hover:text-primary transition-colors font-medium">Car rentals</a>
              <a href="#" className="text-gray-700 hover:text-primary transition-colors font-medium">Attractions</a>
              <a href="#" className="text-gray-700 hover:text-primary transition-colors font-medium">Airport taxis</a>
            </nav>

            {/* User Actions */}
            <div className="flex items-center space-x-4">
              {isLoggedIn ? (
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-700">Hello, {userEmail.split('@')[0]}</span>
                  <Button variant="outline" size="sm" onClick={handleLogout}>
                    Sign out
                  </Button>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm">
                    Register
                  </Button>
                  <Button onClick={() => setIsAuthModalOpen(true)} size="sm">
                    Sign in
                  </Button>
                </div>
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
              <a href="#" className="block px-3 py-2 text-gray-700 hover:text-primary font-medium">Stays</a>
              <a href="#" className="block px-3 py-2 text-gray-700 hover:text-primary font-medium">Flights</a>
              <a href="#" className="block px-3 py-2 text-gray-700 hover:text-primary font-medium">Car rentals</a>
              <a href="#" className="block px-3 py-2 text-gray-700 hover:text-primary font-medium">Attractions</a>
              <a href="#" className="block px-3 py-2 text-gray-700 hover:text-primary font-medium">Airport taxis</a>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section with Search */}
      <section className="relative booking-hero-gradient text-white py-20">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Find your next stay
            </h1>
            <p className="text-xl md:text-2xl opacity-90">
              Search low prices on hotels, homes and much more...
            </p>
          </div>

          {/* Search Tabs */}
          <Card className="max-w-4xl mx-auto booking-shadow-lg">
            <CardContent className="p-6">
              <Tabs defaultValue="hotels" className="w-full">
                <TabsList className="grid w-full grid-cols-5 bg-muted/50">
                  <TabsTrigger value="hotels" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                    <Building className="h-4 w-4" />
                    Stays
                  </TabsTrigger>
                  <TabsTrigger value="flights" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                    <Plane className="h-4 w-4" />
                    Flights
                  </TabsTrigger>
                  <TabsTrigger value="trains" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                    <Train className="h-4 w-4" />
                    Trains
                  </TabsTrigger>
                  <TabsTrigger value="buses" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                    <Bus className="h-4 w-4" />
                    Buses
                  </TabsTrigger>
                  <TabsTrigger value="packages" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                    <Package className="h-4 w-4" />
                    Packages
                  </TabsTrigger>
                </TabsList>

                {/* Hotel Search */}
                <TabsContent value="hotels" className="mt-6">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="md:col-span-2">
                      <Label htmlFor="destination" className="text-sm font-semibold text-gray-700">Where are you going?</Label>
                      <Select>
                        <SelectTrigger className="h-12 border-2 focus:border-primary">
                          <SelectValue placeholder="Enter destination" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="mumbai">Mumbai, Maharashtra, India</SelectItem>
                          <SelectItem value="delhi">New Delhi, Delhi, India</SelectItem>
                          <SelectItem value="goa">Goa, India</SelectItem>
                          <SelectItem value="kerala">Kerala, India</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="checkin" className="text-sm font-semibold text-gray-700">Check-in date</Label>
                      <Input type="date" id="checkin" className="h-12 border-2 focus:border-primary" />
                    </div>
                    <div>
                      <Label htmlFor="checkout" className="text-sm font-semibold text-gray-700">Check-out date</Label>
                      <Input type="date" id="checkout" className="h-12 border-2 focus:border-primary" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div>
                      <Label htmlFor="guests" className="text-sm font-semibold text-gray-700">Guests</Label>
                      <Select>
                        <SelectTrigger className="h-12 border-2 focus:border-primary">
                          <SelectValue placeholder="2 adults • 0 children • 1 room" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 adult • 0 children • 1 room</SelectItem>
                          <SelectItem value="2">2 adults • 0 children • 1 room</SelectItem>
                          <SelectItem value="3">3 adults • 0 children • 1 room</SelectItem>
                          <SelectItem value="4">4 adults • 0 children • 1 room</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <Button 
                    className="w-full mt-6 h-12 text-lg font-semibold booking-gradient hover:opacity-90" 
                    onClick={() => handleSearch('hotels', {})}
                  >
                    <Search className="h-5 w-5 mr-2" />
                    Search
                  </Button>
                </TabsContent>

                {/* Flight Search */}
                <TabsContent value="flights" className="mt-6">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <Label htmlFor="from" className="text-sm font-semibold text-gray-700">From</Label>
                      <Select>
                        <SelectTrigger className="h-12 border-2 focus:border-primary">
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
                      <Label htmlFor="to" className="text-sm font-semibold text-gray-700">To</Label>
                      <Select>
                        <SelectTrigger className="h-12 border-2 focus:border-primary">
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
                      <Label htmlFor="departure" className="text-sm font-semibold text-gray-700">Departure</Label>
                      <Input type="date" id="departure" className="h-12 border-2 focus:border-primary" />
                    </div>
                    <div>
                      <Label htmlFor="passengers" className="text-sm font-semibold text-gray-700">Passengers</Label>
                      <Select>
                        <SelectTrigger className="h-12 border-2 focus:border-primary">
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
                    className="w-full mt-6 h-12 text-lg font-semibold booking-gradient hover:opacity-90" 
                    onClick={() => handleSearch('flights', {})}
                  >
                    <Search className="h-5 w-5 mr-2" />
                    Search flights
                  </Button>
                </TabsContent>

                {/* Train Search */}
                <TabsContent value="trains" className="mt-6">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <Label htmlFor="train-from" className="text-sm font-semibold text-gray-700">From</Label>
                      <Select>
                        <SelectTrigger className="h-12 border-2 focus:border-primary">
                          <SelectValue placeholder="Select station" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="delhi">New Delhi (NDLS)</SelectItem>
                          <SelectItem value="mumbai">Mumbai Central (MMCT)</SelectItem>
                          <SelectItem value="bangalore">Bangalore City (SBC)</SelectItem>
                          <SelectItem value="chennai">Chennai Central (MAS)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="train-to" className="text-sm font-semibold text-gray-700">To</Label>
                      <Select>
                        <SelectTrigger className="h-12 border-2 focus:border-primary">
                          <SelectValue placeholder="Select station" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="mumbai">Mumbai Central (MMCT)</SelectItem>
                          <SelectItem value="delhi">New Delhi (NDLS)</SelectItem>
                          <SelectItem value="goa">Goa (MAO)</SelectItem>
                          <SelectItem value="kerala">Kochi (ERS)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="train-departure" className="text-sm font-semibold text-gray-700">Departure</Label>
                      <Input type="date" id="train-departure" className="h-12 border-2 focus:border-primary" />
                    </div>
                    <div>
                      <Label htmlFor="train-class" className="text-sm font-semibold text-gray-700">Class</Label>
                      <Select>
                        <SelectTrigger className="h-12 border-2 focus:border-primary">
                          <SelectValue placeholder="Select class" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sleeper">Sleeper</SelectItem>
                          <SelectItem value="ac3">AC 3-Tier</SelectItem>
                          <SelectItem value="ac2">AC 2-Tier</SelectItem>
                          <SelectItem value="ac1">AC 1st Class</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <Button 
                    className="w-full mt-6 h-12 text-lg font-semibold booking-gradient hover:opacity-90"
                    onClick={() => handleSearch('trains', {})}
                  >
                    <Search className="h-5 w-5 mr-2" />
                    Search trains
                  </Button>
                </TabsContent>

                {/* Bus Search */}
                <TabsContent value="buses" className="mt-6">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <Label htmlFor="bus-from" className="text-sm font-semibold text-gray-700">From</Label>
                      <Select>
                        <SelectTrigger className="h-12 border-2 focus:border-primary">
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
                      <Label htmlFor="bus-to" className="text-sm font-semibold text-gray-700">To</Label>
                      <Select>
                        <SelectTrigger className="h-12 border-2 focus:border-primary">
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
                      <Label htmlFor="bus-departure" className="text-sm font-semibold text-gray-700">Departure</Label>
                      <Input type="date" id="bus-departure" className="h-12 border-2 focus:border-primary" />
                    </div>
                    <div>
                      <Label htmlFor="bus-type" className="text-sm font-semibold text-gray-700">Bus Type</Label>
                      <Select>
                        <SelectTrigger className="h-12 border-2 focus:border-primary">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ac-sleeper">AC Sleeper</SelectItem>
                          <SelectItem value="ac-semi-sleeper">AC Semi-Sleeper</SelectItem>
                          <SelectItem value="non-ac-sleeper">Non-AC Sleeper</SelectItem>
                          <SelectItem value="non-ac-seater">Non-AC Seater</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <Button 
                    className="w-full mt-6 h-12 text-lg font-semibold booking-gradient hover:opacity-90"
                    onClick={() => handleSearch('buses', {})}
                  >
                    <Search className="h-5 w-5 mr-2" />
                    Search buses
                  </Button>
                </TabsContent>

                {/* Package Search */}
                <TabsContent value="packages" className="mt-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="destination" className="text-sm font-semibold text-gray-700">Destination</Label>
                      <Select>
                        <SelectTrigger className="h-12 border-2 focus:border-primary">
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
                      <Label htmlFor="duration" className="text-sm font-semibold text-gray-700">Duration</Label>
                      <Select>
                        <SelectTrigger className="h-12 border-2 focus:border-primary">
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
                      <Label htmlFor="budget" className="text-sm font-semibold text-gray-700">Budget</Label>
                      <Select>
                        <SelectTrigger className="h-12 border-2 focus:border-primary">
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
                    className="w-full mt-6 h-12 text-lg font-semibold booking-gradient hover:opacity-90"
                    onClick={() => handleSearch('packages', {})}
                  >
                    <Search className="h-5 w-5 mr-2" />
                    Search packages
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
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Offers</h2>
            <p className="text-lg text-gray-600">Promotions, deals and special offers for you</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="booking-shadow hover:booking-shadow-lg transition-all duration-300 booking-rounded-lg overflow-hidden">
              <div className="h-48 bg-gradient-to-r from-red-500 to-pink-500 flex items-center justify-center">
                <div className="text-center text-white">
                  <h3 className="text-2xl font-bold mb-2">Take your longest vacation yet</h3>
                  <p className="text-sm opacity-90">Browse properties offering long-term stays</p>
                </div>
              </div>
              <CardContent className="p-6">
                <Button variant="outline" className="w-full font-semibold">
                  Find a stay
                </Button>
              </CardContent>
            </Card>

            <Card className="booking-shadow hover:booking-shadow-lg transition-all duration-300 booking-rounded-lg overflow-hidden">
              <div className="h-48 bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
                <div className="text-center text-white">
                  <h3 className="text-2xl font-bold mb-2">Fly away to your dream vacation</h3>
                  <p className="text-sm opacity-90">Get inspired, compare and book flights</p>
                </div>
              </div>
              <CardContent className="p-6">
                <Button variant="outline" className="w-full font-semibold">
                  Search flights
                </Button>
              </CardContent>
            </Card>

            <Card className="booking-shadow hover:booking-shadow-lg transition-all duration-300 booking-rounded-lg overflow-hidden">
              <div className="h-48 bg-gradient-to-r from-green-500 to-teal-500 flex items-center justify-center">
                <div className="text-center text-white">
                  <h3 className="text-2xl font-bold mb-2">Car rental for any kind of trip</h3>
                  <p className="text-sm opacity-90">Compare rental cars and find deals</p>
                </div>
              </div>
              <CardContent className="p-6">
                <Button variant="outline" className="w-full font-semibold">
                  Search cars
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Trending destinations</h2>
            <p className="text-lg text-gray-600">Most popular choices for travelers from India</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'Goa', image: 'photo-1500375592092-40eb2168fd21', properties: '1,289 properties' },
              { name: 'Kerala', image: 'photo-1482938289607-e9573fc25ebb', properties: '967 properties' },
              { name: 'Rajasthan', image: 'photo-1469474968028-56623f02e42e', properties: '2,156 properties' },
              { name: 'Himachal', image: 'photo-1472396961693-142e6e269027', properties: '1,543 properties' }
            ].map((destination) => (
              <Card key={destination.name} className="group cursor-pointer booking-shadow hover:booking-shadow-lg transition-all duration-300 booking-rounded-lg overflow-hidden">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={`https://images.unsplash.com/${destination.image}?w=400&h=200&fit=crop`}
                    alt={destination.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-xl font-bold">{destination.name}</h3>
                    <p className="text-sm opacity-90">{destination.properties}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-white/20 booking-rounded flex items-center justify-center mr-3">
                  <span className="text-white font-bold text-sm">N</span>
                </div>
                <span className="text-xl font-bold">Next Trip</span>
              </div>
              <p className="text-blue-100">Book accommodations, flights and more.</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-blue-100">
                <li><a href="#" className="hover:text-white transition-colors">Coronavirus (COVID-19) FAQs</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Manage your trips</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Customer Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Safety Resource Center</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Discover</h4>
              <ul className="space-y-2 text-blue-100">
                <li><a href="#" className="hover:text-white transition-colors">Genius loyalty program</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Seasonal and holiday deals</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Travel articles</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Next Trip for Business</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Terms and settings</h4>
              <ul className="space-y-2 text-blue-100">
                <li><a href="#" className="hover:text-white transition-colors">Privacy & cookies</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms & conditions</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Partner dispute</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Modern Slavery Statement</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-blue-400 mt-8 pt-8 text-center text-blue-100">
            <p>&copy; 2024 Next Trip. All rights reserved.</p>
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
