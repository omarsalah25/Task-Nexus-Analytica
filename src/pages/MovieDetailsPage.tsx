import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getMovieDetails } from "../api/omdb";
import type { Movie } from "../types/movie";
import Loader from "../components/Loader";
import { Button, Tag } from "antd";
import { motion } from "framer-motion";

const MovieDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState<Movie>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovie = async () => {
      setLoading(true);
      try {
        const data = await getMovieDetails(id!);
        setMovie(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  if (loading) return <Loader />;
  if (!movie) return <p>Movie not found.</p>;

  return (
    <div className="w-full h-full flex flex-col min-h-screen relative overflow-hidden">
      <motion.img
        initial={{ scale: 1.05, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
        src={movie.Poster}
        alt={movie.Title}
        className="w-full h-full absolute -z-0"
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="bg-black/70 absolute top-0 left-0 w-full h-full"
      />

      <motion.div
        className="absolute top-5 left-5"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <motion.div whileHover={{ scale: 1.05 }}>
          <Button onClick={() => navigate(-1)} className="w-fit">
            ← Back to Results
          </Button>
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute max-w-3xl bottom-1/4 translate-y-1/4 px-12 flex flex-col gap-3"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <h1 className="md:text-4xl text-xl text-white font-bold mb-2">
          {movie.Title}
        </h1>

        <div className="grid grid-cols-2 gap-y-2">
          <p className="text-white text-lg">
            <strong>Genre: </strong>
            <span className="text-gray-300 text-base font-medium">
              {movie.Genre}
            </span>
          </p>

          <p className="text-white text-lg">
            <strong>Year: </strong>
            <span className="text-gray-300 text-base font-medium">
              {movie.Year}
            </span>
          </p>

          <p className="text-white text-lg">
            <strong>Rating :</strong>
            <span className="text-gray-300">
              <Tag
                color={
                  Number(movie.imdbRating) >= 7
                    ? "gold"
                    : Number(movie.imdbRating) < 4
                    ? "error"
                    : "cyan"
                }
                className="text-base font-medium"
              >
                {movie.imdbRating}
              </Tag>
            </span>
          </p>

          <p className="text-white text-lg">
            <strong>Runtime :</strong>
            <span className="text-gray-300 text-base font-medium">
              {movie.Runtime}
            </span>
          </p>
        </div>

        <p className="text-white text-lg">
          <strong>Plot:</strong>
          <span
            className="text-gray-300 text-base font-medium"
            dangerouslySetInnerHTML={{ __html: movie.Plot || "" }}
          />
        </p>
      </motion.div>
    </div>
  );
};

export default MovieDetail;
