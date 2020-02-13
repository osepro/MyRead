import React, { Component } from "react";
import PropTypes from "prop-types";

class ShelfChanger extends Component {
  render() {
    const { chooseOption, bookItem, shelf, optionval } = this.props;
    return (
      <div className="book-shelf-changer">
        <select onChange={chooseOption} value={shelf}>
          <option disabled>Move to...</option>
          <option data-bookid={bookItem.id} data-optionval={optionval}>
            Currently Reading
          </option>
          <option data-bookid={bookItem.id} data-optionval={optionval}>
            Want to Read
          </option>
          <option data-bookid={bookItem.id} data-optionval={optionval}>
            Read
          </option>
          <option data-name={bookItem.title} data-optionval="None">
            None
          </option>
        </select>
      </div>
    );
  }
}

ShelfChanger.propTypes = {
  chooseOption: PropTypes.func.isRequired,
  bookItem: PropTypes.object.isRequired,
  shelf: PropTypes.string.isRequired
};

export default ShelfChanger;
