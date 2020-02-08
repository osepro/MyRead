import * as BooksAPI from "../BooksAPI";

const ApiCall = searchVal => {
  if (searchVal.length > 0) {
    BooksAPI.search(searchVal.trim())
      .then(data => console.log(data))
      .catch(err => console.log(err));
  }
};
export default ApiCall;
