import React, { useState, useEffect } from 'react';
import axios from 'axios';

const apiKey = 'DEMO_KEY';
const URL = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`;

function App() {
  const [apod, setApod] = useState(null);

  useEffect(() => {
    function fetchPhoto() {
      axios
        .get(URL)
        .then((res) => {
          setApod(res.data);
        })
        .catch((err) => {
          console.error('Error fetching data:', err.message);
        });
    }

    fetchPhoto();
  }, []);

  return (
    <div>
      <h1>NASA Astronomy Picture of the Day</h1>
      {apod ? (
        <div>
          <h2>{apod.title}</h2>
          <img src={apod.url} alt={apod.title} />
          <p>{apod.explanation}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default App;
