import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

function RandomNumberComponent({ onFetchBookName }) {
  const [randomNumber, setRandomNumber] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBookName = (number) => {
    setLoading(true);
    setError(null);

    fetch(`http://localhost/API/Catalog.php?CatalogID=${number}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        // Call the onFetchBookName function passed from the parent to set the title
        if (onFetchBookName) {
          onFetchBookName(data["Book Name"]);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching book name:", error);
        setError("Failed to fetch book name");
        setLoading(false);
      });
  };

  useEffect(() => {
    // Generate the random number only once when the component mounts
    const number = Math.floor(Math.random() * 1934) + 1;
    setRandomNumber(number);
    fetchBookName(number);
  }, []); // Empty dependency array ensures this runs only once

  // const handleRefresh = () => {
  //   const newNumber = Math.floor(Math.random() * 1934) + 1;
  //   setRandomNumber(newNumber);
  //   fetchBookName(newNumber);
  // };

  // Handle loading and error states
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  // return (
    // <div>
    //   <button onClick={handleRefresh}>Refresh Recommendation</button>
    // </div>
  // );
}

// PropTypes validation
RandomNumberComponent.propTypes = {
  onFetchBookName: PropTypes.func.isRequired, // Ensures a function is passed and it's required
};

export default RandomNumberComponent;
