import React from "react";
import PropTypes from "prop-types";

const BookCard = ({ book, onBookTransaction }) => {
  return (
    <div className='book'>
      <div className='book-top'>
        <div
          className='book-cover'
          style={{
            width: "128px",
            height: "188px",
            backgroundImage: `url(${book.imageLinks.thumbnail})`,
          }}
        />
        <div className='book-shelf-changer'>
          <select
            onChange={(e) => onBookTransaction(book, e.target.value)}
            defaultValue={book.shelf}
          >
            <option value='move' disabled=''>
              Move to...
            </option>
            <option value='currentlyReading'>Currently Reading</option>
            <option value='wantToRead'>Want to Read</option>
            <option
              onClick={(e) => {
                this.change(e.target.value);
              }}
              value='read'
            >
              Read
            </option>
            <option value='none'>None</option>
          </select>
        </div>
      </div>
      <div className='book-title'>{book.title.substr(0, 32)}</div>
      <div className='book-authors'>
        {book.authors &&
          book.authors.map((author, index) => <div key={index}>{author}</div>)}
      </div>
    </div>
  );
};

BookCard.propTypes = {
  book: PropTypes.object.isRequired,
  onBookTransaction: PropTypes.func.isRequired,
};

export default React.memo(BookCard);
