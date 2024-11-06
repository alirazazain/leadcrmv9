import { useState, useRef, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { useRecruitmentStore, Client } from '../../../store/recruitmentStore';

interface SearchResult {
  type: 'client';
  id: string;
  title: string;
  subtitle?: string;
  matchedField: string;
}

interface ClientSearchProps {
  onClientSelect: (clientId: string) => void;
}

export function ClientSearch({ onClientSelect }: ClientSearchProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const { clients } = useRecruitmentStore();
  const searchTimeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const searchClients = (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    const searchResults: SearchResult[] = [];
    const query = searchQuery.toLowerCase();

    clients.forEach((client: Client) => {
      if (client.name.toLowerCase().includes(query)) {
        searchResults.push({
          type: 'client',
          id: client.id,
          title: client.name,
          subtitle: client.location,
          matchedField: 'name'
        });
      }
    });

    setResults(searchResults);
  };

  const handleSearch = (value: string) => {
    setQuery(value);
    setIsLoading(true);
    
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    searchTimeoutRef.current = setTimeout(() => {
      searchClients(value);
      setIsLoading(false);
    }, 300);

    setShowResults(true);
  };

  const handleResultClick = (result: SearchResult) => {
    onClientSelect(result.id);
    setShowResults(false);
    setQuery('');
  };

  const highlightMatch = (text: string, query: string) => {
    if (!text || !query) return text;
    
    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return parts.map((part, i) => 
      part.toLowerCase() === query.toLowerCase() ? 
        <span key={i} className="bg-yellow-100 font-medium">{part}</span> : 
        part
    );
  };

  return (
    <div className="relative flex-1" ref={searchRef}>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search clients..."
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent sm:text-sm"
        />
        {query && (
          <button
            onClick={() => {
              setQuery('');
              setResults([]);
              setShowResults(false);
            }}
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
          >
            <X className="h-5 w-5 text-gray-400 hover:text-gray-600" />
          </button>
        )}
      </div>

      {showResults && (query || isLoading) && (
        <div className="absolute z-10 mt-1 w-full bg-white rounded-lg shadow-lg border border-gray-200">
          {isLoading ? (
            <div className="px-4 py-3 text-sm text-gray-500">
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-indigo-500 border-t-transparent"></div>
                <span className="ml-2">Searching...</span>
              </div>
            </div>
          ) : results.length > 0 ? (
            <div className="py-2">
              {results.map((result) => (
                <button
                  key={result.id}
                  onClick={() => handleResultClick(result)}
                  className="w-full px-4 py-2 text-sm text-left hover:bg-gray-50 focus:outline-none focus:bg-gray-50"
                >
                  <div className="font-medium text-gray-900">
                    {highlightMatch(result.title, query)}
                  </div>
                  {result.subtitle && (
                    <div className="text-gray-500">
                      {highlightMatch(result.subtitle, query)}
                    </div>
                  )}
                </button>
              ))}
            </div>
          ) : (
            <div className="px-4 py-3 text-sm text-gray-500">
              No results found
            </div>
          )}
        </div>
      )}
    </div>
  );
}