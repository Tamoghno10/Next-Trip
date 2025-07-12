
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Star, Plane, Clock, MapPin, Wifi, Car, Utensils, Train, Bus, Shield, Check, Edit3 } from 'lucide-react';

interface SearchResultsProps {
  results: any[];
  onBooking: (item: any) => void;
}

const SearchResults: React.FC<SearchResultsProps> = ({ results, onBooking }) => {
  const [editingResult, setEditingResult] = useState<number | null>(null);
  const [modifiedResults, setModifiedResults] = useState(results);

  // Indian cities with airport facilities
  const indianCitiesWithAirports = [
    { value: 'mumbai', label: 'Mumbai, Maharashtra' },
    { value: 'delhi', label: 'New Delhi, Delhi' },
    { value: 'bangalore', label: 'Bangalore, Karnataka' },
    { value: 'chennai', label: 'Chennai, Tamil Nadu' },
    { value: 'kolkata', label: 'Kolkata, West Bengal' },
    { value: 'hyderabad', label: 'Hyderabad, Telangana' },
    { value: 'pune', label: 'Pune, Maharashtra' },
    { value: 'ahmedabad', label: 'Ahmedabad, Gujarat' },
    { value: 'cochin', label: 'Kochi, Kerala' },
    { value: 'goa', label: 'Goa' },
    { value: 'jaipur', label: 'Jaipur, Rajasthan' },
    { value: 'lucknow', label: 'Lucknow, Uttar Pradesh' },
    { value: 'chandigarh', label: 'Chandigarh' },
    { value: 'coimbatore', label: 'Coimbatore, Tamil Nadu' },
    { value: 'nagpur', label: 'Nagpur, Maharashtra' },
    { value: 'vadodara', label: 'Vadodara, Gujarat' },
    { value: 'indore', label: 'Indore, Madhya Pradesh' },
    { value: 'bhubaneswar', label: 'Bhubaneswar, Odisha' },
    { value: 'thiruvananthapuram', label: 'Thiruvananthapuram, Kerala' },
    { value: 'srinagar', label: 'Srinagar, Jammu & Kashmir' },
    { value: 'amritsar', label: 'Amritsar, Punjab' },
    { value: 'varanasi', label: 'Varanasi, Uttar Pradesh' },
    { value: 'guwahati', label: 'Guwahati, Assam' },
    { value: 'patna', label: 'Patna, Bihar' },
    { value: 'raipur', label: 'Raipur, Chhattisgarh' },
    { value: 'mangalore', label: 'Mangalore, Karnataka' },
    { value: 'vijayawada', label: 'Vijayawada, Andhra Pradesh' },
    { value: 'vishakhapatnam', label: 'Visakhapatnam, Andhra Pradesh' },
    { value: 'madurai', label: 'Madurai, Tamil Nadu' },
    { value: 'tiruchirappalli', label: 'Tiruchirappalli, Tamil Nadu' },
  ];

  if (!results || results.length === 0) {
    return null;
  }

  const getInsurancePrice = (basePrice: number) => {
    return Math.round(basePrice * 0.08); // 8% of base price
  };

  const handleEditRoute = (index: number) => {
    setEditingResult(index);
  };

  const handleSaveRoute = (index: number, newFrom: string, newTo: string) => {
    const updatedResults = [...modifiedResults];
    updatedResults[index] = {
      ...updatedResults[index],
      from: newFrom,
      to: newTo
    };
    setModifiedResults(updatedResults);
    setEditingResult(null);
  };

  const RouteEditor = ({ result, index }: { result: any, index: number }) => {
    const [tempFrom, setTempFrom] = useState(result.from);
    const [tempTo, setTempTo] = useState(result.to);

    return (
      <div className="flex items-center gap-2 mb-2">
        <Select value={tempFrom.toLowerCase()} onValueChange={(value) => setTempFrom(indianCitiesWithAirports.find(city => city.value === value)?.label.split(',')[0] || value)}>
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {indianCitiesWithAirports.map((city) => (
              <SelectItem key={city.value} value={city.value}>
                {city.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <span className="text-gray-400">→</span>
        <Select value={tempTo.toLowerCase()} onValueChange={(value) => setTempTo(indianCitiesWithAirports.find(city => city.value === value)?.label.split(',')[0] || value)}>
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {indianCitiesWithAirports.map((city) => (
              <SelectItem key={city.value} value={city.value}>
                {city.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button size="sm" onClick={() => handleSaveRoute(index, tempFrom, tempTo)}>
          Save
        </Button>
        <Button size="sm" variant="outline" onClick={() => setEditingResult(null)}>
          Cancel
        </Button>
      </div>
    );
  };

  const InsuranceColumn = ({ basePrice }: { basePrice: number }) => {
    const insurancePrice = getInsurancePrice(basePrice);
    
    return (
      <div className="border-l border-gray-200 pl-4 ml-4">
        <div className="flex items-center gap-2 mb-2">
          <Shield className="h-4 w-4 text-green-600" />
          <span className="text-sm font-medium text-gray-900">Travel Insurance</span>
        </div>
        <div className="text-lg font-bold text-green-600 mb-2">₹{insurancePrice.toLocaleString()}</div>
        <div className="space-y-1 text-xs text-gray-600">
          <div className="flex items-center gap-1">
            <Check className="h-3 w-3 text-green-500" />
            <span>Trip Cancellation</span>
          </div>
          <div className="flex items-center gap-1">
            <Check className="h-3 w-3 text-green-500" />
            <span>Medical Coverage</span>
          </div>
          <div className="flex items-center gap-1">
            <Check className="h-3 w-3 text-green-500" />
            <span>Baggage Protection</span>
          </div>
        </div>
        <Button size="sm" variant="outline" className="mt-2 w-full text-xs">
          Add Insurance
        </Button>
      </div>
    );
  };

  const renderFlightResult = (flight: any, index: number) => (
    <Card key={flight.id} className="hover:shadow-lg transition-shadow duration-300">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="bg-blue-100 p-3 rounded-full">
              <Plane className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-bold text-lg">{flight.airline}</h3>
              <div className="flex items-center gap-2">
                {editingResult === index ? (
                  <RouteEditor result={flight} index={index} />
                ) : (
                  <div className="flex items-center gap-2">
                    <p className="text-gray-600">{flight.from} → {flight.to}</p>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleEditRoute(index)}
                      className="p-1 h-6 w-6"
                    >
                      <Edit3 className="h-3 w-3" />
                    </Button>
                  </div>
                )}
              </div>
              <div className="flex items-center gap-2 mt-1">
                <Clock className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-600">{flight.duration}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center">
            <div className="text-right">
              <div className="text-2xl font-bold text-blue-600">₹{flight.price.toLocaleString()}</div>
              <div className="text-sm text-gray-600 mb-2">{flight.departure} - {flight.arrival}</div>
              <Button onClick={() => onBooking(flight)} className="bg-orange-500 hover:bg-orange-600">
                Book Now
              </Button>
            </div>
            <InsuranceColumn basePrice={flight.price} />
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const renderHotelResult = (hotel: any, index: number) => (
    <Card key={hotel.id} className="hover:shadow-lg transition-shadow duration-300">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="bg-green-100 p-3 rounded-full">
              <MapPin className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h3 className="font-bold text-lg">{hotel.name}</h3>
              <p className="text-gray-600">{hotel.location}</p>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="text-sm text-gray-600 ml-1">{hotel.rating}</span>
                </div>
                <div className="flex gap-1">
                  {hotel.amenities.map((amenity: string, index: number) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {amenity}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center">
            <div className="text-right">
              <div className="text-2xl font-bold text-green-600">₹{hotel.price.toLocaleString()}</div>
              <div className="text-sm text-gray-600 mb-2">per night</div>
              <Button onClick={() => onBooking(hotel)} className="bg-orange-500 hover:bg-orange-600">
                Book Now
              </Button>
            </div>
            <InsuranceColumn basePrice={hotel.price} />
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const renderTrainResult = (train: any, index: number) => (
    <Card key={train.id} className="hover:shadow-lg transition-shadow duration-300">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="bg-indigo-100 p-3 rounded-full">
              <Train className="h-6 w-6 text-indigo-600" />
            </div>
            <div>
              <h3 className="font-bold text-lg">{train.trainName}</h3>
              <p className="text-gray-600">{train.trainNumber}</p>
              <div className="flex items-center gap-2">
                {editingResult === index ? (
                  <RouteEditor result={train} index={index} />
                ) : (
                  <div className="flex items-center gap-2">
                    <p className="text-gray-600">{train.from} → {train.to}</p>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleEditRoute(index)}
                      className="p-1 h-6 w-6"
                    >
                      <Edit3 className="h-3 w-3" />
                    </Button>
                  </div>
                )}
              </div>
              <div className="flex items-center gap-2 mt-1">
                <Clock className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-600">{train.duration}</span>
                <Badge variant="outline" className="text-xs ml-2">
                  {train.class}
                </Badge>
              </div>
            </div>
          </div>
          <div className="flex items-center">
            <div className="text-right">
              <div className="text-2xl font-bold text-indigo-600">₹{train.price.toLocaleString()}</div>
              <div className="text-sm text-gray-600 mb-2">{train.departure} - {train.arrival}</div>
              <Button onClick={() => onBooking(train)} className="bg-orange-500 hover:bg-orange-600">
                Book Now
              </Button>
            </div>
            <InsuranceColumn basePrice={train.price} />
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const renderBusResult = (bus: any, index: number) => (
    <Card key={bus.id} className="hover:shadow-lg transition-shadow duration-300">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="bg-orange-100 p-3 rounded-full">
              <Bus className="h-6 w-6 text-orange-600" />
            </div>
            <div>
              <h3 className="font-bold text-lg">{bus.busOperator}</h3>
              <div className="flex items-center gap-2">
                {editingResult === index ? (
                  <RouteEditor result={bus} index={index} />
                ) : (
                  <div className="flex items-center gap-2">
                    <p className="text-gray-600">{bus.from} → {bus.to}</p>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleEditRoute(index)}
                      className="p-1 h-6 w-6"
                    >
                      <Edit3 className="h-3 w-3" />
                    </Button>
                  </div>
                )}
              </div>
              <div className="flex items-center gap-2 mt-1">
                <Clock className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-600">{bus.duration}</span>
                <Badge variant="outline" className="text-xs ml-2">
                  {bus.busType}
                </Badge>
              </div>
            </div>
          </div>
          <div className="flex items-center">
            <div className="text-right">
              <div className="text-2xl font-bold text-orange-600">₹{bus.price.toLocaleString()}</div>
              <div className="text-sm text-gray-600 mb-2">{bus.departure} - {bus.arrival}</div>
              <Button onClick={() => onBooking(bus)} className="bg-orange-500 hover:bg-orange-600">
                Book Now
              </Button>
            </div>
            <InsuranceColumn basePrice={bus.price} />
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const renderPackageResult = (pkg: any, index: number) => (
    <Card key={pkg.id} className="hover:shadow-lg transition-shadow duration-300">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="bg-purple-100 p-3 rounded-full">
              <MapPin className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <h3 className="font-bold text-lg">{pkg.name}</h3>
              <p className="text-gray-600">{pkg.duration}</p>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="text-sm text-gray-600 ml-1">{pkg.rating}</span>
                </div>
                <div className="flex gap-1">
                  {pkg.includes.map((item: string, index: number) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {item}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center">
            <div className="text-right">
              <div className="text-2xl font-bold text-purple-600">₹{pkg.price.toLocaleString()}</div>
              <div className="text-sm text-gray-600 mb-2">per person</div>
              <Button onClick={() => onBooking(pkg)} className="bg-orange-500 hover:bg-orange-600">
                Book Now
              </Button>
            </div>
            <InsuranceColumn basePrice={pkg.price} />
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Search Results</h2>
          <p className="text-gray-600">Found {modifiedResults.length} options for you</p>
        </div>
        
        <div className="space-y-4">
          {modifiedResults.map((result, index) => {
            // Determine the type based on the properties
            if (result.airline) {
              return renderFlightResult(result, index);
            } else if (result.amenities) {
              return renderHotelResult(result, index);
            } else if (result.trainName) {
              return renderTrainResult(result, index);
            } else if (result.busOperator) {
              return renderBusResult(result, index);
            } else if (result.duration && result.includes) {
              return renderPackageResult(result, index);
            }
            return null;
          })}
        </div>
      </div>
    </section>
  );
};

export default SearchResults;
