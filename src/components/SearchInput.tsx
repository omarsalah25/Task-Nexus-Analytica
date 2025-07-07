import { Input } from 'antd';
import React, { useState, useEffect, useMemo } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  initialQuery?: string;
  delay?: number;
}

const SearchBarComponent: React.FC<SearchBarProps> = ({
  onSearch,
  delay = 500,
  initialQuery = '',
}) => {
  const memoizedInitialQuery = useMemo(() => initialQuery, [initialQuery]);

  const [searchTerm, setSearchTerm] = useState(memoizedInitialQuery);
  const [debouncedTerm, setDebouncedTerm] = useState(memoizedInitialQuery);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedTerm(searchTerm);
    }, delay);
    return () => clearTimeout(handler);
  }, [searchTerm, delay]);

  useEffect(() => {
    if (debouncedTerm) {
      onSearch(debouncedTerm);
    }
  }, [debouncedTerm, onSearch]);

  useEffect(() => {
    setSearchTerm(memoizedInitialQuery);
  }, [memoizedInitialQuery]);
  return (
    <div className="w-full max-w-xl mx-auto my-4">
      <Input
      className="w-full px-4 py-2 rounded-lg shadow-sm"
      placeholder="Enter at least 3 characters to search for a movie"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      minLength={3}
      />
    </div>
  );
};

const SearchBar = React.memo(SearchBarComponent);

export default SearchBar;
