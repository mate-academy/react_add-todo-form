import React, { useState } from 'react';

// Define the type for a movie
interface Movie {
  title: string;
  description: string;
}

// MoviesList component
const MoviesList: React.FC<{ movies: Movie[] }> = ({ movies }) => {
  return (
    <ul>
      {movies.map((movie, index) => (
        <li key={index}>
          <h2>{movie.title}</h2>
          <p>{movie.description}</p>
        </li>
      ))}
    </ul>
  );
};

// App component
const App: React.FC = () => {
  // Sample data for movies
  const movies: Movie[] = [
    { title: 'Inception', description: 'A mind-bending thriller about dreams.' },
    { title: 'Interstellar', description: 'A journey through space and time.' },
    { title: 'The Dark Knight', description: 'Batman faces his greatest nemesis.' },
    { title: 'Joker', description: 'A deep dive into the origins of an iconic villain.' },
  ];

  // State for query and filtered movies
  const [query, setQuery] = useState<string>('');
  const visibleMovies = movies.filter(
    movie =>
      movie.title.toLowerCase().includes(query.toLowerCase()) ||
      movie.description.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div>
      <h1>Movies List</h1>
      <input
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />
      <MoviesList movies={visibleMovies} />
    </div>
  );
};

export default App;
