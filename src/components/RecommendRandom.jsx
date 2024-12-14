import { useState, useEffect } from "react";
import PropTypes from "prop-types";

function RandomNumberComponent({ onFetchBookData }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBookData = (number) => {
    setLoading(true);
    setError(null);

    fetch(`http://localhost/API/Catalog.php?CatalogID=${number}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        if (onFetchBookData) {
          // Pass all book data to the parent after mapping null to empty strings
          const mappedData = {
            title: data["Book Name"] || "",
            author: data["Author"] || "",
            genre: data["Genre"] || "",
            description: data["Description"] || "",
            publicationYear: data["Publication Year"] || "",
            img: data["Image URL"] || "", // Assuming the key is "Image URL"
          };
          onFetchBookData(mappedData);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching book data:", error);
        setError("Failed to fetch book data");
        setLoading(false);
      });
  };

  useEffect(() => {
    const number = Math.floor(Math.random() * 1934) + 1;
    fetchBookData(number);
  }, []); // Run only once on mount

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return null; // No UI for this component as it just triggers data fetch
}

// PropTypes validation
RandomNumberComponent.propTypes = {
  onFetchBookData: PropTypes.func.isRequired, // Ensure the function is passed and required
};

export default RandomNumberComponent;
