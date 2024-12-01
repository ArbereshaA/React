import React from "react";
import { GoStarFill } from "react-icons/go";

function FavoriteBook({ book, nr, removeFromFavorites }) {
  const data = new Date(book.released).toDateString();

  const handleRemoveFromFavorites = () => {
    removeFromFavorites(book);
  };

  return (
    <div className="book">
      <h3>Favorite Book: {nr}</h3>
      <h2>{book.name}</h2>

      <div className="details">
        <p>👨: {book.authors}</p>
        <p>📖: {book.numberOfPages} pages</p>
        <p>🏘️: {book.country}</p>
        <p>⏰: {data}</p>
       
      </div> 
          {" "}
          <button onClick={handleRemoveFromFavorites} className="star">
          <div className="text-yellow-600 "><GoStarFill /> :</div> Remove from Favorites
      </button>
       
    </div>
  );
}

export default FavoriteBook;






// const sortedBooks = [...books].sort((a, b) => {
//   // Assuming `released` is a string in the format YYYY-MM-DD
//   // `released` is a string in the format YYYY-MM-DD
//   return new Date(b.released) - new Date(a.released);
// });