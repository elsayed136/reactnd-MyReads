import React from "react";
import { Route, Link } from "react-router-dom";
import "./App.css";

import * as BooksAPI from "./BooksAPI";
import BooksList from "./components/BooksList";
import BookSearch from "./components/BookSearch";

class BooksApp extends React.Component {
  state = {
    books: [],
    searchedBooks: [],
    showSearchPage: false,
  };

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState(() => ({
        books,
      }));
    });
  }

  /**
   * @use to move book throw shelfs
   * @param {obj} book info
   * @param {object} shelf to where to book will move
   */
  bookTransaction = (book, shelf) => {
    this.setState((prevState) => ({
      books: prevState.books.map((b) => {
        if (b.id === book.id) b.shelf = shelf;
        return b;
      }),
    }));

    BooksAPI.update(book, shelf)
      .then(() => {
        BooksAPI.getAll().then((books) => {
          this.setState(() => ({ books }));
        });
      })
      .catch(() => {
        BooksAPI.getAll().then((books) => {
          this.setState(() => ({ books }));
        });
      });
  };

  /**
   * @use search for books throw BooksAPI
   * @param {string} query
   */
  bookSearch = (query) => {
    if (!query) query = " ";

    BooksAPI.search(query).then((searchedBooks) => {
      !searchedBooks.error
        ? this.setState(() => ({ searchedBooks }))
        : this.setState(() => ({ searchedBooks: [] }));
    });
  };

  /**
   * @use Add new book to our shelfes
   * @param {object} book info
   * @param {string} shelf to where to book will move
   */
  addBook = (book, shelf) => {
    if (shelf === "none") return;
    BooksAPI.update(book, shelf).then(() => {
      BooksAPI.getAll().then((books) => {
        this.setState(() => ({ books, searchedBooks: [] }));
      });
    });
  };

  render() {
    const { books, searchedBooks } = this.state;
    return (
      <div className='app'>
        {console.log(this.state.books)}
        <Route
          path='/search'
          render={({ history }) => (
            <BookSearch
              books={books}
              searchedBooks={searchedBooks}
              onBookSearch={this.bookSearch}
              onAddBook={(book, shelf) => {
                this.addBook(book, shelf);
                history.push("/");
              }}
            />
          )}
        />
        <Route
          exact
          path='/'
          render={() => (
            <>
              <BooksList
                books={books}
                onBookTransaction={this.bookTransaction}
              />
              <div className='open-search'>
                <Link to='/search'>Add a book</Link>
              </div>
            </>
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
