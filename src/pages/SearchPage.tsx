import React, { useCallback, useEffect, useState } from 'react';
import SearchBar from '../components/SearchInput';
import { searchMovies } from '../api/omdb';
import MovieList from '../components/MovieList';
import type { Movie } from '../types/movie';
import { useSearchParams } from 'react-router-dom';
import Loader from '../components/Loader';

const SearchPage = () => {
  const [results, setResults] = useState<Movie[]>([]);
  const memoizedResults = React.useMemo(() => results, [results]);

  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
const MAX_RESULTS = 20;

  const handleSearch = useCallback(
    async (searchTerm: string) => {
      if (!searchTerm ) {
        setSearchParams({});
        setResults([]);
        setError('');
        return;
      }

      setSearchParams({ q: searchTerm });
      setLoading(true);
      setError('');

      try {
        const data = await searchMovies(searchTerm);
        if (data.Response === 'True') {
          setResults(data.Search.slice(0, MAX_RESULTS));
        } else {
          setResults([]);
          if (data.Error == "Too many results.")
            setError('Too many results, please narrow your search.')
          else
          setError(data.Error);
        }
      } catch {
        setResults([]);
        setError('Failed to fetch movies.');
      } finally {
        setLoading(false);
      }
    },
    [setSearchParams]
  );

  useEffect(() => {
    if (initialQuery && results.length === 0) {
      handleSearch(initialQuery);
    }
  }, [initialQuery, handleSearch, results.length]);

  return (
    <>
        {loading && <Loader/>}
    <div className="p-5">

      <SearchBar initialQuery={initialQuery} onSearch={handleSearch} />
      <div className="w-full 2xl:max-w-max xl:max-w-7xl grid 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-2 mx-auto gap-5">
        {!loading && !error && memoizedResults.length >= 0 ? (
          <MovieList movies={memoizedResults} loading={loading} error={error} />
        ) : (
          error && <div className='min-h-dvh col-span-full flex items-center justify-center'>
            <p className="text-red-500">{error}</p>
            </div>

        )}
      </div>
    </div>
    </>

  );
};

export default SearchPage;
