import { useState, useEffect } from 'react';
import { useRecruitmentStore } from '../../../store/recruitmentStore';

interface FiltersState {
  industry: string;
  country: string;
  city: string;
  owner: string;
}

interface ClientFiltersProps {
  onFiltersChange: (filters: FiltersState) => void;
}

export function ClientFilters({ onFiltersChange }: ClientFiltersProps) {
  const { clients } = useRecruitmentStore();
  const [filters, setFilters] = useState<FiltersState>({
    industry: '',
    country: '',
    city: '',
    owner: ''
  });

  const [industries] = useState(() => {
    const uniqueIndustries = new Set(clients.map(c => c.industry).filter(Boolean));
    return Array.from(uniqueIndustries).sort();
  });

  const [owners] = useState(() => {
    const uniqueOwners = new Set(clients.map(c => c.owner.name));
    return Array.from(uniqueOwners).sort();
  });

  const [locations] = useState(() => {
    const uniqueLocations = new Set(clients.map(c => c.location).filter(Boolean));
    return Array.from(uniqueLocations).map(location => {
      const [city, country] = location.split(', ');
      return { city, country };
    });
  });

  const [countries] = useState(() => {
    const uniqueCountries = new Set(locations.map(l => l.country));
    return Array.from(uniqueCountries).sort();
  });

  const [cities, setCities] = useState<string[]>([]);

  useEffect(() => {
    if (filters.country) {
      const filteredCities = locations
        .filter(l => l.country === filters.country)
        .map(l => l.city)
        .sort();
      setCities(filteredCities);
    } else {
      setCities([]);
    }
  }, [filters.country, locations]);

  useEffect(() => {
    onFiltersChange(filters);
  }, [filters, onFiltersChange]);

  const handleChange = (field: keyof FiltersState, value: string) => {
    if (field === 'country' && value !== filters.country) {
      setFilters(prev => ({ ...prev, [field]: value, city: '' }));
    } else {
      setFilters(prev => ({ ...prev, [field]: value }));
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 space-y-6">
      <div className="grid grid-cols-4 gap-6">
        <div>
          <label htmlFor="industry" className="block text-sm font-medium text-gray-700 mb-1">
            Industry
          </label>
          <select
            id="industry"
            value={filters.industry}
            onChange={(e) => handleChange('industry', e.target.value)}
            className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">All Industries</option>
            {industries.map(industry => (
              <option key={industry} value={industry}>
                {industry}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
            Country
          </label>
          <select
            id="country"
            value={filters.country}
            onChange={(e) => handleChange('country', e.target.value)}
            className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">All Countries</option>
            {countries.map(country => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
            City
          </label>
          <select
            id="city"
            value={filters.city}
            onChange={(e) => handleChange('city', e.target.value)}
            disabled={!filters.country}
            className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
          >
            <option value="">All Cities</option>
            {cities.map(city => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="owner" className="block text-sm font-medium text-gray-700 mb-1">
            Client Owner
          </label>
          <select
            id="owner"
            value={filters.owner}
            onChange={(e) => handleChange('owner', e.target.value)}
            className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">All Owners</option>
            {owners.map(owner => (
              <option key={owner} value={owner}>
                {owner}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}