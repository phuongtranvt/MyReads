import React from 'react'
import { Link, Route } from 'react-router-dom'
import './App.css'
import * as BooksAPI from './BooksAPI.js'
import ListBooks from './ListBooks.js'
import SearchBooks from './SearchBooks.js'


class BooksApp extends React.Component {
  state = {
    books: []
  };

  showingShelves = [
    {
      shelf: 'currentlyReading',
      title: 'Currently Reading',
    },
    {
      shelf: 'wantToRead',
      title: 'Want to Read',
    },
    {
      shelf: 'read',
      title: 'Read',
    }
  ];

  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.setState({ books });
    });
  }

  updateBookShelf = (book, toShelf) => {
    BooksAPI.update(book, toShelf)
      .then(() => {
        this.updateBooksState(book, toShelf);
      });
  }

  updateBooksState = (book, toShelf) => {
    const foundBook = this.state.books.find(myBook => myBook.id === book.id);
    if (foundBook) {
      // Update BookShelf
      this.setState(prevState => ({
        books: prevState.books.map(b => (
          b.id !== book.id ? b : {
            ...b,
            shelf: toShelf
          }
        ))
      }));
    } else {
      // Add new book
      this.setState(prevState => ({
        books: [...prevState.books, book]
      }))
    }
  }

  render() {
    const { books } = this.state;

    return (
      <div className="app">
          <Route path="/searchBooks" render={() => (
            <SearchBooks
              books={books}
              onUpdateBookShelf={this.updateBookShelf}
            />
          )} />

          <Route exact path="/" render={() => (
              <div>
                <ListBooks
                  showingShelves={this.showingShelves}
                  books={books}
                  onUpdateBookShelf={this.updateBookShelf}
                />

                <div className="open-search">
                  <Link to="/searchBooks">Add a book</Link>
                </div>
              </div>
          )} />


      </div>
    )
  }
}

export default BooksApp
