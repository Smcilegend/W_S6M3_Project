import React, { useState, useEffect } from 'react';
import axios from 'axios';

const styles = {
  appContainer: {
    textAlign: 'center',
    padding: '20px',
    backgroundColor: '#f4f4f4',
  },
  title: {
    color: '#2c3e50',
    fontSize: '2rem',
  },
  photoContainer: {
    marginTop: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  image: {
    maxWidth: '100%',
    height: 'auto',
    borderRadius: '10px',
  },
  explanation: {
    maxWidth: '800px',
    marginTop: '20px',
    fontSize: '1.1rem',
    color: '#34495e',
  },
  loadingMessage: {
    fontSize: '1.2rem',
    color: '#95a5a6',
  },
  button: {
    '--accent-color': 'white',
    background: 'transparent',
    borderRadius: '3px',
    border: '1px solid var(--accent-color)',
    color: 'var(--accent-color)',
    display: 'inline-block',
    margin: '0.5rem 1rem',
    padding: '0.5rem 0',
    transition: 'all 200ms ease-in-out',
    width: '11rem',
  },
  buttonHover: {
    filter: 'brightness(0.85)',
  },
  buttonActive: {
    filter: 'brightness(1)',
  },
  primaryButton: {
    background: 'var(--accent-color)',
    color: 'black',
  },
};

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
    <div style={styles.appContainer}>
      <h1 style={styles.title}>NASA Astronomy Picture of the Day</h1>
      {apod ? (
        <div style={styles.photoContainer}>
          <h2>{apod.title}</h2>
          <img style={styles.image} src={apod.url} alt={apod.title} />
          <p style={styles.explanation}>{apod.explanation}</p>
          <a
            href="https://github.com"
            style={{
              ...styles.button,
              ...styles.primaryButton,
            }}
            onMouseOver={(e) => (e.target.style.filter = 'brightness(0.85)')}
            onMouseOut={(e) => (e.target.style.filter = 'brightness(1)')}
          >
            Go to GitHub
          </a>
        </div>
      ) : (
        <p style={styles.loadingMessage}>Loading...</p>
      )}
    </div>
  );
}

export default App;
