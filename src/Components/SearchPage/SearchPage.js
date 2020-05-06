import React, { Component } from "react";
import "../../App.css";
import { Link } from "react-router-dom";
import * as BooksAPI from "../../BooksAPI";

class SearchPage extends Component {
  state = {
    result: [],
  };
  handleOnInputChange = (event) => {
    const query = event.target.value;
    BooksAPI.search(query).then((result) => {
      console.log(result);
      if (result && result.length > 0) {
        result.forEach((element) => {
          this.props.state.books.forEach((id) => {
            if (element.id === id.id) {
              element.shelf = id.shelf;
            }
          });
        });
        this.setState({ result: result });
      }
    });
  };
  render() {
    return (
      <div>
        <div className="search-books">
          <div className="search-books-bar">
            <Link to="/">
              <button className="close-search">Close</button>
            </Link>
            <div className="search-books-input-wrapper">
              <input
                type="text"
                placeholder="Search by title or author"
                onChange={this.handleOnInputChange}
              />
            </div>
          </div>
          <div className="search-books-results">
            <ol className="books-grid" />
          </div>
        </div>
        <div>
          <div className="bookshelf-books">
            <ol className="books-grid">
              {this.state.result.map((book) => (
                <li key={book.id}>
                  <div className="book">
                    <div className="book-top">
                      <div
                        className="book-cover"
                        style={{
                          width: 128,
                          height: 193,
                          backgroundImage: `url(${
                            book.imageLinks ? book.imageLinks.thumbnail : ""
                          })`,
                        }}
                      />
                      <div className="book-shelf-changer">
                        <select
                          defaultValue={book.shelf ? book.shelf : "none"}
                          onChange={(e) => this.props.changeShelf(book, e)}
                        >
                          <option value="move" disabled>
                            Move to...
                          </option>
                          <option value="currentlyReading">
                            Currently Reading
                          </option>
                          <option value="wantToRead">Want to Read</option>
                          <option value="read">Read</option>
                          <option value="none">None</option>
                        </select>
                      </div>
                    </div>
                    <div className="book-title">{book.title}</div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    );
  }
}

export default SearchPage;
