import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from './Card';

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

  if (!apod) return <p>Loading...</p>;

  return (
    <div>
      <h1>NASA Astronomy Picture of the Day</h1>
      <Card
        title={apod?.title || 'No title available'}
        text={apod?.explanation || 'No explanation available'}
        image={apod?.url || 'https://via.placeholder.com/600x400'}
        author={apod?.copyright || 'Unknown'}
        date={apod?.date || 'Unknown'}
      />
    </div>
  );
}

export default App;
