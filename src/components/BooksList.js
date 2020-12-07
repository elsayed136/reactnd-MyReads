import React, { Component } from "react";
import PropTypes from "prop-types";

import BookShelf from "./BookShelf";

class BooksList extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    onBookTransaction: PropTypes.func.isRequired,
  };
  state = {
    shelfs: [
      { title: "Currently Reading", key: "currentlyReading" },
      { title: "Want To Read", key: "wantToRead" },
      { title: "Read", key: "read" },
    ],
  };
  render() {
    const { books, onBookTransaction } = this.props;
    return (
      <div className='list-books'>
        <div className='list-books-title'>
          <h1>MyReads</h1>
        </div>
        <div className='list-books-content'>
          <div>
            {this.state.shelfs.map((shelf) => (
              <BookShelf
                key={shelf.key}
                changeState={this.changeState}
                title={shelf.title}
                books={books}
                shelf={shelf.key}
                onBookTransaction={onBookTransaction}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default BooksList;
