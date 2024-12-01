import React, { useState } from "react";
import BookCard from "./BookCard";
import axios from "axios";
import FavoriteBook from "./FavoriteBook";


function App() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [sortbutton, setSortButton] = useState(false);
  const [showSortComponent, setShowSortComponent] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);

  function sortBooksByReleaseDate(books, ascending = true) {
    const sortedBooks = books.slice().sort((a, b) => {
      const dateA = new Date(a.released);
      const dateB = new Date(b.released);
  
      if (ascending) {
        return dateA - dateB;
      } else {
        return dateB - dateA;
      }
    });
  
    return sortedBooks;
  }
  const sortedBooksAscending = sortBooksByReleaseDate(books, true); // Ascending order
const sortedBooksDescending = sortBooksByReleaseDate(books, false); // Descending order
 
  const fetchBooks = async () => {
    try {
      setLoading(true);
      setProgress(0);

      // Simulate a 3-second delay
      const duration = 3000;
      const startTime = Date.now();
      console.log("starttime", startTime);
      // Function to update progress
      const updateProgress = () => {
        const currentTime = Date.now();
        const elapsedTime = currentTime - startTime;
        const percentage = Math.min((elapsedTime / duration) * 100, 100);
        setProgress(percentage);
      };

      // Start updating progress every 100 milliseconds
      const progressInterval = setInterval(updateProgress, 100);

      const response = await axios.get(
        "https://www.anapioficeandfire.com/api/books?pageSize=30"
      );

      // Clear the progress update interval when the request is complete
      clearInterval(progressInterval);

      console.log(response.data);
      setBooks(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
      // Set progress to 100% when data fetching is complete
      setProgress(100);
      setShowSortComponent(true);
      setSortButton(false);
    }
  };

  const addToFavorites = (book) => {
    if (!favorites.some((favorite) => favorite.isbn === book.isbn)) {
      setFavorites([...favorites, book]);
    }
  };

  const removeFromFavorites = (book) => {
    setFavorites((fromFavorites) =>
      fromFavorites.filter((favorite) => favorite.isbn !== book.isbn)
    );
  };
  const toggleSort = () => {
    setSortButton(!sortbutton);
  };
  //const sortedBooks = sortBooksByReleaseDate(books);

  console.log(favorites, "favorites");

  return (
    <div className="App">
      <h1>Game of Thrones Books</h1>

      <h2>Fetch a list from an API and display it</h2>

      <button className="fetch-button" onClick={fetchBooks} disabled={loading}>
        {loading ? (
          <div className="spinner"></div>
        ) : progress === 100 ? (
          "Books"
        ) : (
          "Fetch Data"
        )}
        <div className="percentage">{progress.toFixed(0)}%</div>
      </button>
      <br />

      <div className="button-container">
        <button
          className="buttons"
          onClick={() => setShowFavorites(!showFavorites)}
        >
          {showFavorites ? "Show Fetched Books" : "Show Favorites"}
        </button>

        {/* Always display the "Sort" button */}
        {!showFavorites && (
          <button className="buttons" onClick={toggleSort}>
            {sortbutton ? "Unsort" : "Sort"}
          </button>
        )}
      </div>

      {showFavorites && (
        <div className="grid-container">
          {favorites.map((favoriteBook, index) => (
            <div key={favoriteBook.isbn}>
              <FavoriteBook
                book={favoriteBook}
                nr={index + 1}
                removeFromFavorites={() => removeFromFavorites(favoriteBook)}
              />
            </div>
          ))}
        </div>
      )}

      {showSortComponent && !showFavorites && (
        <div className="button-container">
          <div className="grid-container">
            {sortbutton
              ? sortedBooksDescending.map((book, index) => (
                  <BookCard
                    addToFavorites={addToFavorites}
                    book={book}
                    key={book.isbn}
                    nr={index + 1}
                    isFavorite={favorites.some(
                      (favorite) => favorite.isbn === book.isbn
                    )}
                  />
                ))
              : sortedBooksAscending.map((book, index) => (
                  <BookCard
                    addToFavorites={addToFavorites}
                    book={book}
                    key={book.isbn}
                    nr={index + 1}
                    isFavorite={favorites.some(
                      (favorite) => favorite.isbn === book.isbn
                    )}
                  />
                ))}
          </div>
        </div>
      )}
    </div>
  );
}
export default App;
