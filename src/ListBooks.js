import React, { Component } from 'react'
import PropTypes from 'prop-types'
import BookShelf from './BookShelf.js'

class ListBooks extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    showingShelves: PropTypes.array,
    onUpdateBookShelf: PropTypes.func
  };

  render() {
    const { books, showingShelves, onUpdateBookShelf } = this.props;

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            {showingShelves && (
              showingShelves.map(item => (
                <BookShelf
                  key={item.shelf}
                  title={item.title}
                  books={books.filter(book => book.shelf === item.shelf)}
                  onUpdateBookShelf={onUpdateBookShelf}
                />
              )))
            }
          </div>
        </div>
      </div>
    );
  }
}

export default ListBooks;
