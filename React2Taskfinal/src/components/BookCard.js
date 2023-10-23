import React from "react";
import { GoStarFill, GoStar } from "react-icons/go";

function BookCard({ book, nr, addToFavorites, isFavorite }) {
  const data = new Date(book.released).toDateString();

  const handleAddToFavorites = () => {
    addToFavorites(book);
  };

  return (
    <div className="book">
      <h3>Book: {nr}</h3>
      <h2>{book.name}</h2>
      <div className="details">
        <p>👨: {book.authors}</p>
        <p>📖: {book.numberOfPages} pages</p>
        <p>🏘️: {book.country}</p>
        <p>⏰: {data}</p>
        <button onClick={handleAddToFavorites} className=" star  ">
  
        {isFavorite ? (
          <>
           <div className="text-yellow-600 "><GoStarFill /></div> :{" "}  Added
          </>
        ) : (
          <>
            {" "}
            <GoStar /> : 
            Add to Favorites
          </>
        )}
      </button>
      </div>{" "}
      
      
    </div>
  );
}

export default BookCard;
