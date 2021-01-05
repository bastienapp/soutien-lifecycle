import axios from 'axios';

const { useState, useEffect } = require('react');

function LifeCycleComponent() {
  const [title, setTitle] = useState('');
  const [yearStart, setYearStart] = useState('');
  const [yearStop, setYearStop] = useState('');
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    console.log('useEffect');
    // éviter de mettre à jour le state dans useEffect

    axios
      .get('http://www.omdbapi.com/?s=tacos&apikey=b5c85bc6')
      .then((response) => {
        setMovies(response.data.Search);
      });

    return function cleanup() {
      console.log('cleanup');
    };
  }, []);

  console.log('render');
  return (
    <div className='LifeCycleComponent'>
      <div>
        <span>Movies:&nbsp;</span>
        <span>
          {movies
            .filter((movie) => {
              let showMovie = true;
              if (yearStart && parseInt(movie.Year) < parseInt(yearStart)) {
                showMovie = false;
              }
              if (yearStop && parseInt(movie.Year) > parseInt(yearStop)) {
                showMovie = false;
              }
              if (title && !movie.Title.includes(title)) {
                showMovie = false;
              }
              return showMovie;
            })
            .map((movie) => movie.Title)
            .join(', ')}
        </span>
      </div>
      <label>yearStart</label>
      <input
        type='text'
        value={yearStart}
        onChange={(event) => setYearStart(event.target.value)}
      />
      <br />
      <label>yearStop</label>
      <input
        type='text'
        value={yearStop}
        onChange={(event) => setYearStop(event.target.value)}
      />
      <br />
      <label>title</label>
      <input
        type='text'
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />
    </div>
  );
}

export default LifeCycleComponent;
