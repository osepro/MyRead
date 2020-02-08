import React, { Component } from "react";
import PropTypes from "prop-types";

class ShelfChanger extends Component {
  render() {
    const { chooseOption, bookItem, shelf, optionval } = this.props;
    return (
      <div className="book-shelf-changer">
        <select onChange={chooseOption} value={shelf}>
          <option disabled>{process.env.REACT_APP_MOVE_TO}</option>
          <option data-bookid={bookItem.id} data-optionval={optionval}>
            {process.env.REACT_APP_CURR_READ}
          </option>
          <option data-bookid={bookItem.id} data-optionval={optionval}>
            {process.env.REACT_APP_WANT_READ}
          </option>
          <option
            data-bookid={bookItem.id}
            value={process.env.REACT_APP_READ}
            data-optionval={optionval}
          >
            {process.env.REACT_APP_READ}
          </option>
          <option data-name={bookItem.title} data-optionval={optionval}>
            {process.env.REACT_APP_NONE}
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
