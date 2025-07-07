import axios from 'axios';

// Your OMDb API key
const API_KEY = import.meta.env.VITE_OMDB_API_KEY;
const BASE_URL = 'https://www.omdbapi.com/';

const omdbClient = axios.create({
  baseURL: BASE_URL,
  params: {
    apikey: API_KEY,
  },
});

// Function to search movies by title
export const searchMovies = async (query: string ) => {
  try {
    const response = await omdbClient.get('', {
      params: {
        s: query,
        type: 'movie',
        
      },
    });
    return response.data;
  } catch (error) {
    console.error('Search Error:', error);
    throw new Error('Failed to fetch search results.');
  }
};

// Function to get movie details by IMDb ID
export const getMovieDetails = async (id: string) => {
  try {
    const response = await omdbClient.get('', {
      params: {
        i: id,
        plot: 'full',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Details Error:', error);
    throw new Error('Failed to fetch movie details.');
  }
};
