import { useState, useEffect } from 'react';

function RandomNumberComponent({ onFetchBookName }) {
  const [randomNumber, setRandomNumber] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Generate the random number only once when the component mounts
    const number = Math.floor(Math.random() * 1934) + 1;
    setRandomNumber(number);

    // Fetch the book name using the random number
    if (number) {
      fetch(`http://localhost/API/Catalog.php?`)
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
    }
  }, [onFetchBookName]);

  // Handle loading and error states
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return null; // Parent component handles the book name display
}

export default RandomNumberComponent;
