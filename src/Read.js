import React from "react";
import PropTypes from "prop-types";
import ShelfChanger from "./ShelfChanger";

const Read = props => {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">Read</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {props.books &&
            props.books
              .filter(book => book.shelf === "read")
              .map((bookinner, i) => (
                <li key={i}>
                  <div className="book">
                    <div className="book-top">
                      <div
                        className="book-cover"
                        style={{
                          width: 128,
                          height: 193,
                          backgroundImage: `url(${
                            !bookinner.imageLinks
                              ? "No Image Provided"
                              : bookinner.imageLinks.thumbnail
                          })`
                        }}
                      ></div>
                      <ShelfChanger
                        bookItem={bookinner}
                        chooseOption={props.chooseOption}
                        shelf={props.shelf(bookinner.id)}
                        optionval={props.optiontype}
                      />
                    </div>
                    <div className="book-title">{bookinner.title}</div>
                    <div className="book-authors">
                      {!bookinner.authors
                        ? "Oopss! No Author"
                        : bookinner.authors.map(author => author)}
                    </div>
                  </div>
                </li>
              ))}
        </ol>
      </div>
    </div>
  );
};

Read.propTypes = {
  books: PropTypes.array.isRequired
};

export default Read;
