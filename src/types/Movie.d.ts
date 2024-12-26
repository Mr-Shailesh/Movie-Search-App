interface Movie {
  genres: any;
  vote_average: any;
  release_date: string;
  id: number;
  title: string;
  overview: string;
  poster_path: string;
}

interface MovieState {
  movies: Movie[];          
  searchResults: Movie[];    
  selectedMovie: Movie | null; 
  loading: boolean;
  error: string | null;
}


  interface MovieCardProps {
    id: number;
    title: string;
    releaseDate: string;
    posterPath: string;
    overview: string;
    onClick: () => void;
  }


  