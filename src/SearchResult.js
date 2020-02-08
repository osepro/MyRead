import React from "react";
import PropTypes from "prop-types";
import ShelfChanger from "./ShelfChanger";

const SearchResult = props => {
  return (
    <div className="bookshelf-books">
      <h3>{props.loading}</h3>
      {props.searchItem.length === 0 ? (
        ""
      ) : (
        <ol className="books-grid">
          {props.bookList && props.bookList.length
            ? props.bookList.map((bookItem, i) => (
                <li key={i}>
                  <div className="book">
                    <div className="book-top">
                      <div
                        className="book-cover"
                        style={{
                          width: 128,
                          height: 193,
                          backgroundImage: `url(${
                            !bookItem.imageLinks
                              ? "No Image"
                              : bookItem.imageLinks.thumbnail
                          })`
                        }}
                      ></div>

                      <ShelfChanger
                        bookItem={bookItem}
                        chooseOption={props.chooseOption}
                        shelf={props.shelf(bookItem.id)}
                        optionval={props.optiontype}
                      />
                    </div>
                    <div className="book-title">{bookItem.title}</div>
                    <div className="book-authors">
                      {!bookItem.authors
                        ? ""
                        : bookItem.authors.map(author => author)}
                    </div>
                  </div>
                </li>
              ))
            : ""}
        </ol>
      )}
    </div>
  );
};
SearchResult.propTypes = {
  bookList: PropTypes.array.isRequired,
  searchItem: PropTypes.string.isRequired,
  chooseOption: PropTypes.func.isRequired,
  loading: PropTypes.string
};

export default SearchResult;
