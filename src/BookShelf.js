import React from 'react'
import PropTypes from 'prop-types'
import sortBy from 'sort-by'
import Book from './Book.js'

const BookShelf = (props) => {
  let { books, onUpdateBookShelf, title } = props;

  books.sort(sortBy('title'));

  return (
  <div className="bookshelf">
    {title && (
        <h2 className="bookshelf-title">{title}</h2>
    )}
    <div className="bookshelf-books">
      <ol className="books-grid">
        {books && books.map(book => (
            <li key={book.id}>
              <Book
                book={book}
                onUpdateBookShelf={onUpdateBookShelf}
              />
            </li>
          ))}
      </ol>
    </div>
  </div>
)};

BookShelf.propTypes = {
  books: PropTypes.array.isRequired,
  onUpdateBookShelf: PropTypes.func.isRequired,
  title: PropTypes.string,
};


export default BookShelf;
