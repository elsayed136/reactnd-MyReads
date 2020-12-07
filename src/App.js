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
  };

  async componentDidMount() {
    const books = await BooksAPI.getAll();
    this.setState({ books });
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

    BooksAPI.search(query).then((books) => {
      this.setState({
        searchedBooks: books.error
          ? []
          : books.filter(
              (book) =>
                book.imageLinks !== undefined || book.authors !== undefined
            ),
      });
    });
  };

  bookSearch2 = (query) => {
    if (!query) query = " ";

    BooksAPI.search(query).then((newBooks) => {
      this.setState(({ books }) => {
        let searchedBooks = newBooks.error
          ? []
          : newBooks.filter(
              (book) =>
                book.imageLinks !== undefined && book.authors !== undefined
            );

        searchedBooks.forEach((searchedBook) => {
          books.forEach((MyBook) => {
            if (searchedBook.id === MyBook.id) {
              searchedBook.shelf = MyBook.shelf;
            }
          });
        });

        return { searchedBooks };
      });
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
        this.setState({ books, searchedBooks: [] });
      });
    });
  };

  render() {
    const { books, searchedBooks } = this.state;
    return (
      <div className='app'>
        <Route
          path='/search'
          render={({ history }) => (
            <BookSearch
              books={searchedBooks}
              onBookSearch={this.bookSearch2}
              onAddBook={(book, shelf) => {
                this.addBook(book, shelf);
                history.push("/");
              }}
              booksIds={books.map((i) => ({
                id: i.id,
                shelf: i.shelf,
              }))}
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
