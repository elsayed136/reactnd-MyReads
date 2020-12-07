import React from "react";
import PropTypes from "prop-types";

import BookCard from "./BookCard";

const BookShelf = ({ shelf, books, title, onBookTransaction }) => {
  return (
    <div className='bookshelf'>
      <h2 className='bookshelf-title'>{title}</h2>
      <div className='bookshelf-books'>
        <ol className='books-grid'>
          {books.map((book) => {
            return book.shelf === shelf ? (
              <li key={book.id}>
                <BookCard onBookTransaction={onBookTransaction} book={book} />
              </li>
            ) : null;
          })}
        </ol>
      </div>
    </div>
  );
};

BookShelf.propTypes = {
  shelf: PropTypes.string,
  books: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  onBookTransaction: PropTypes.func.isRequired,
};

export default BookShelf;
