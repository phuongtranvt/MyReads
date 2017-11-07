import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import escapeRegExp from 'escape-string-regexp'
import PropTypes from 'prop-types'
import BookShelf from './BookShelf.js'
import * as BooksAPI from './BooksAPI.js'


class SearchBooks extends Component {
  maxResults = 20;

  static propTypes = {
    books: PropTypes.array.isRequired,
    onUpdateBookShelf: PropTypes.func.isRequired,
  }

  state = {
    searchBooksResults: []
  }

  mergeShelfForSearchResult = (book) => {
    const foundBook = this.props.books.find(myBook => myBook.id === book.id);
    if (foundBook) {
      return {
        ...book,
        shelf: foundBook.shelf,
      }
    }

   return book;
  }

  searchBooks = (query) => {
    if (query) {
      let hashTable = {};
      this.props.books.forEach(book => hashTable[book.id] = book.shelf);
      console.log(hashTable);

      BooksAPI.search(escapeRegExp(query), this.maxResults)
        .then(results => {
          if (Array.isArray(results)) {
            results.forEach(book => book.shelf = hashTable[book.id] || 'none');
            this.setState({
              searchBooksResults: results
            });
          }
        })
    } else {
      this.setState({ searchBooksResults: [] });
    }
  }

  render() {
    let { searchBooksResults } = this.state;
    console.log('searchBooksResults');
    console.log(searchBooksResults);

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            <input
              type="text"
              placeholder="Search by title or author"
              onChange={(event) => this.searchBooks(event.target.value)}
            />

          </div>
        </div>
        <div className="search-books-results">
          {searchBooksResults && (
            <BookShelf
              books={searchBooksResults}
              onUpdateBookShelf={this.props.onUpdateBookShelf}
            />
          )}
        </div>
      </div>
    );
  }
}

export default SearchBooks;
