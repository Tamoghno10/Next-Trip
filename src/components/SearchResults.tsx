
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, Plane, Clock, MapPin, Wifi, Car, Utensils, Train, Bus } from 'lucide-react';

interface SearchResultsProps {
  results: any[];
  onBooking: (item: any) => void;
}

const SearchResults: React.FC<SearchResultsProps> = ({ results, onBooking }) => {
  if (!results || results.length === 0) {
    return null;
  }

  const renderFlightResult = (flight: any) => (
    <Card key={flight.id} className="hover:shadow-lg transition-shadow duration-300">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="bg-blue-100 p-3 rounded-full">
              <Plane className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-bold text-lg">{flight.airline}</h3>
              <p className="text-gray-600">{flight.from} → {flight.to}</p>
              <div className="flex items-center gap-2 mt-1">
                <Clock className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-600">{flight.duration}</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-blue-600">₹{flight.price.toLocaleString()}</div>
            <div className="text-sm text-gray-600 mb-2">{flight.departure} - {flight.arrival}</div>
            <Button onClick={() => onBooking(flight)} className="bg-orange-500 hover:bg-orange-600">
              Book Now
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const renderHotelResult = (hotel: any) => (
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
          <div className="text-right">
            <div className="text-2xl font-bold text-green-600">₹{hotel.price.toLocaleString()}</div>
            <div className="text-sm text-gray-600 mb-2">per night</div>
            <Button onClick={() => onBooking(hotel)} className="bg-orange-500 hover:bg-orange-600">
              Book Now
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const renderTrainResult = (train: any) => (
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
              <p className="text-gray-600">{train.from} → {train.to}</p>
              <div className="flex items-center gap-2 mt-1">
                <Clock className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-600">{train.duration}</span>
                <Badge variant="outline" className="text-xs ml-2">
                  {train.class}
                </Badge>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-indigo-600">₹{train.price.toLocaleString()}</div>
            <div className="text-sm text-gray-600 mb-2">{train.departure} - {train.arrival}</div>
            <Button onClick={() => onBooking(train)} className="bg-orange-500 hover:bg-orange-600">
              Book Now
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const renderBusResult = (bus: any) => (
    <Card key={bus.id} className="hover:shadow-lg transition-shadow duration-300">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="bg-orange-100 p-3 rounded-full">
              <Bus className="h-6 w-6 text-orange-600" />
            </div>
            <div>
              <h3 className="font-bold text-lg">{bus.busOperator}</h3>
              <p className="text-gray-600">{bus.from} → {bus.to}</p>
              <div className="flex items-center gap-2 mt-1">
                <Clock className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-600">{bus.duration}</span>
                <Badge variant="outline" className="text-xs ml-2">
                  {bus.busType}
                </Badge>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-orange-600">₹{bus.price.toLocaleString()}</div>
            <div className="text-sm text-gray-600 mb-2">{bus.departure} - {bus.arrival}</div>
            <Button onClick={() => onBooking(bus)} className="bg-orange-500 hover:bg-orange-600">
              Book Now
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const renderPackageResult = (pkg: any) => (
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
          <div className="text-right">
            <div className="text-2xl font-bold text-purple-600">₹{pkg.price.toLocaleString()}</div>
            <div className="text-sm text-gray-600 mb-2">per person</div>
            <Button onClick={() => onBooking(pkg)} className="bg-orange-500 hover:bg-orange-600">
              Book Now
            </Button>
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
          <p className="text-gray-600">Found {results.length} options for you</p>
        </div>
        
        <div className="space-y-4">
          {results.map((result) => {
            // Determine the type based on the properties
            if (result.airline) {
              return renderFlightResult(result);
            } else if (result.amenities) {
              return renderHotelResult(result);
            } else if (result.trainName) {
              return renderTrainResult(result);
            } else if (result.busOperator) {
              return renderBusResult(result);
            } else if (result.duration && result.includes) {
              return renderPackageResult(result);
            }
            return null;
          })}
        </div>
      </div>
    </section>
  );
};

export default SearchResults;
