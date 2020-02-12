import React from "react";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import Search from "./Search";
import CurrentlyReading from "./CurrentlyReading";
import WanttoRead from "./WanttoRead";
import Read from "./Read";
import AddBook from "./AddBook";
import SearchResult from "./SearchResult";
import { Route } from "react-router-dom";
import { debounce } from "debounce";
import Notification from "./Notification";

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    books: [],
    searchResult: [],
    searchItem: "",
    message: "",
    active: false,
    status: true,
    loading: "",
    shelfFinder: []
  };

  searchForBooks = event => {
    debounce(this.setState({ searchItem: event.target.value }), 500);
    this.APIDataCall(this.state.searchItem);
  };

  APIDataCall = search => {
    this.setState({
      searchResult: [],
      loading: "loading..."
    });

    if (search.trim() && search.trim().length > 0) {
      BooksAPI.search(search.trim())
        .then(data => {
          data.map(value =>
            this.setState({
              searchResult: [...this.state.searchResult, value],
              loading: ""
            })
          );
        })
        .catch(err => {
          this.setState({
            loading: "Oppss book not found"
          });
        });
    }
  };

  showDisplay = (message, status) => {
    this.setState({
      message,
      active: true,
      status
    });
    let seconds = 0;
    const endTimer = setInterval(() => {
      seconds += 10;
      if (seconds > 2000) {
        this.setState({
          active: false
        });
        clearInterval(endTimer);
      }
    }, 10);
  };

  getData = data => {
    this.setState({
      books: [],
      shelfFinder: []
    });

    data.map(data =>
      this.setState({
        books: [...this.state.books, data],
        shelfFinder: [
          ...this.state.shelfFinder,
          {
            id: data.id,
            shelf: data.shelf
          }
        ]
      })
    );
  };

  bookUpdate = (book, shelf, optionval) => {
    this.setState({
      shelfFinder: []
    });
    BooksAPI.update(book, shelf).then(updatedShelf =>
      this.setState(
        {
          shelfFinder: [...this.state.shelfFinder, updatedShelf]
        },
        this.getAllData(optionval)
      )
    );
  };

  getAllData = () => {
    BooksAPI.getAll().then(res => this.getData(res));
  };

  selectShelf = bookId => {
    const shelfData = this.state.shelfFinder.filter(book => book.id === bookId);
    if (shelfData.length > 0) {
      if (shelfData[0].shelf === "currentlyReading") {
        return "Currently Reading";
      }

      if (shelfData[0].shelf === "read") {
        return "Read";
      }

      if (shelfData[0].shelf === "wantToRead") {
        return "Want to Read";
      }
    } else {
      return "None";
    }
    console.log("Loaded successfully");
  };

  chooseOption = event => {
    const { selectedIndex, options } = event.target;
    const bookID = options[selectedIndex].dataset.bookid;
    const value = options[selectedIndex].text;
    const optionval = options[selectedIndex].dataset.optionval;
    let booksAdd = null;

    if (optionval === "search") {
      booksAdd = this.state.searchResult.find(book => book.id === bookID);
      this.showDisplay("Book successly added to shelf", true);
    } else {
      booksAdd = this.state.books.find(book => book.id === bookID);
      this.showDisplay("Book successly moved to shelf", true);
    }

    switch (value) {
      case "Currently Reading":
        this.bookUpdate(booksAdd, "currentlyReading", optionval);
        break;
      case "Want to Read":
        this.bookUpdate(booksAdd, "wantToRead", optionval);
        break;
      case "Read":
        this.bookUpdate(booksAdd, "read", optionval);
        break;
      default:
        this.bookUpdate(booksAdd, "none", optionval);
    }
  };

  componentDidMount() {
    this.getAllData();
  }

  render() {
    return (
      <div className="app">
        {this.state.message.length > 0 && (
          <Notification
            message={this.state.message}
            showItem={this.state.active ? "fadeIn" : "fadeOut"}
            status={this.state.status ? "success" : "error"}
          />
        )}
        <Route
          path="/search"
          render={() => (
            <div>
              <Search
                searchItem={this.state.searchItem}
                searchForBooks={this.searchForBooks}
              />
              <SearchResult
                bookList={this.state.searchResult}
                searchItem={this.state.searchItem}
                chooseOption={this.chooseOption}
                loading={this.state.loading}
                searchRes={this.state.searchResult}
                shelf={this.selectShelf}
                optiontype={"search"}
              />
            </div>
          )}
        />

        <Route
          exact
          path="/"
          render={() => (
            <div>
              <div className="list-books">
                <div className="list-books-title">
                  <h1>{process.env.REACT_APP_MY_READ}</h1>
                </div>
                <div className="list-books-content">
                  <div>
                    <CurrentlyReading
                      books={this.state.books}
                      chooseOption={this.chooseOption}
                      shelf={this.selectShelf}
                      optiontype={"moved"}
                    />

                    <WanttoRead
                      books={this.state.books}
                      chooseOption={this.chooseOption}
                      shelf={this.selectShelf}
                      optiontype={"moved"}
                    />

                    <Read
                      books={this.state.books}
                      chooseOption={this.chooseOption}
                      shelf={this.selectShelf}
                      optiontype={"moved"}
                    />
                  </div>
                </div>
              </div>
              <AddBook />
            </div>
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
