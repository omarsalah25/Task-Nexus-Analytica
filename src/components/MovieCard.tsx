import React from 'react';
import { Card, Skeleton, Image } from 'antd';
import type { Movie } from '../types/movie';
import { motion } from 'framer-motion';


const MovieCard: React.FC<{
  movie: Movie;
  key: string | number;
  loading?: boolean;
  onClick: () => void;
}> = ({ movie, loading, onClick }) => (
  <motion.div
    key={movie.imdbID}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    whileHover={{ scale: 1.03 }}
    transition={{ duration: 0.3, ease: 'easeInOut' }}
  >
    <Card
      loading={loading}
      onClick={onClick}
      hoverable
      className="w-full h-full md:min-w-80 min-w-full"
      cover={
        loading ? (
          <Skeleton.Image
            active
            className="w-full h-full md:min-w-80 min-w-full max-h-96 min-h-96 object-cover"
          />
        ) : (
          <Image
            alt={movie.Title}
            preview={false}
            placeholder
            className="w-full h-full max-h-96 min-h-96"
            src={movie.Poster}
            onError={({ currentTarget }) => {
              currentTarget.onerror = null;
              currentTarget.src = '';
            }}
          />
        )
      }
    >
      <Card.Meta
        title={movie.Title}
        description={
          <div className="flex flex-row w-full items-center justify-between gap-5 capitalize">
            <p>{movie.Year}</p>
            <p className="border p-1">{movie.Type}</p>
          </div>
        }
      />
    </Card>
  </motion.div>
);

export default MovieCard;
