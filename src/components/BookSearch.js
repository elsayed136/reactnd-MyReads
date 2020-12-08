import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import BookShelf from "./BookShelf";

const BookSearch = ({ books, onBookSearch, onAddBook }) => {
  return (
    <div className='search-books'>
      <div className='search-books-bar'>
        <Link to='/' className='close-search'>
          Close
        </Link>
        <div className='search-books-input-wrapper'>
          <input
            type='text'
            placeholder='Search by title or author'
            onChange={(e) => onBookSearch(e.target.value.trim())}
            autoFocus
          />
        </div>
      </div>
      <div className='search-books-results'>
        <BookShelf
          shelf='search'
          title=''
          books={books}
          onBookTransaction={(book, shelf) => {
            onAddBook(book, shelf);
          }}
        />
      </div>
    </div>
  );
};

BookSearch.propTypes = {
  books: PropTypes.array.isRequired,
  onBookSearch: PropTypes.func.isRequired,
  onAddBook: PropTypes.func.isRequired,
};

export default BookSearch;
