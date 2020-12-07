import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import BookShelf from "./BookShelf";

const BookSearch = ({ searchedBooks, onBookSearch, onAddBook }) => {
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
          />
        </div>
      </div>
      <div className='search-books-results'>
        <BookShelf
          title=''
          books={searchedBooks}
          onBookTransaction={(book, shelf) => {
            onAddBook(book, shelf);
          }}
          transactionState={true}
        />
      </div>
    </div>
  );
};

BookShelf.propTypes = {
  searchedBooks: PropTypes.array.isRequired,
  onBookSearch: PropTypes.func.isRequired,
  onAddBook: PropTypes.func.isRequired,
};

export default BookSearch;
