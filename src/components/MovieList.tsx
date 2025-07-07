import React from 'react'
import type { Movie } from '../types/movie';
import { useNavigate } from 'react-router-dom';
import MovieCard from './MovieCard';



interface MovieListProps {
  movies: Movie[];
  loading?: boolean;
  error?: string;
}

const MovieList: React.FC<MovieListProps> = ({ movies, loading ,error }) => {
    const navigator = useNavigate();
  return (<>
   {loading && <p>Loading...</p>}
{error && <p className="text-red-500">{error}</p>}

 {movies.map((movie, index) => (
    <MovieCard
      key={index}
      movie={movie}
      loading={loading}
      onClick={() => navigator(`/movie/${movie.imdbID}`)}
    />
    
  ))}  
  </>
  )
}

export default MovieList