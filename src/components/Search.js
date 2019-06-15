import React from "react";
import styled from "styled-components";
import slug from "slug";
import PropTypes from "prop-types";
//
import api from "../utils/api.js";

/*
  A Search component, with suggestion list
*/

// Check if mounted
let _isMounted = true;

class SuggestionsList extends React.Component {
  /*
    A list with suggestions for movie titles to pick.
  */

  static propTypes = {
    closeSuggestions: PropTypes.func.isRequired,
    suggestionClick: PropTypes.func.isRequired,
    list: PropTypes.array.isRequired
  };

  render() {
    const { closeSuggestions, suggestionClick, list } = this.props;

    return (
      <ListWrap>
        <div>
          <button onClick={closeSuggestions}>(close)</button>
        </div>

        <ul>
          {list &&
            list.map(item => (
              <li key={item.imdbID}>
                <a
                  onClick={suggestionClick.bind(null, item.imdbID, item.Title)}
                >
                  {item.Title}

                  {item.Year && ` (${item.Year})`}
                </a>
              </li>
            ))}
        </ul>
      </ListWrap>
    );
  }
}

class Search extends React.Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    placeholder: PropTypes.string
  };

  state = {
    title: "",
    loading: false,
    error: null,
    movieTitles: null,
    showSuggestions: false
  };

  getMovieTitles = movie => {
    this.setState({
      movieTitles: null,
      loading: true
    });

    api.movieTitles(movie).then(results => {
      if (!_isMounted) return null;

      if (results.error) {
        this.setState({
          loading: false,
          error: results.error
        });
      } else {
        this.setState({
          loading: false,
          movieTitles: results.titles,
          showSuggestions: true
        });
      }
    });
  };

  showSuggestions = () => {
    this.setState({
      showSuggestions: true
    });
  };

  closeSuggestions = event => {
    event && event.preventDefault();

    this.setState({
      showSuggestions: false
    });
  };

  suggestionClick = (imdbID, title) => {
    // User clicked on a suggestion, navigatie to: /movie-title?id=tt1234
    this.closeSuggestions();

    this.setState({
      title: "",
      movieTitles: null
    });

    // Use pathname to show a nice title, ID for actual lookup
    this.props.history.push({
      pathname: slug(title),
      search: `?id=${imdbID}`
    });
  };

  handleChange = event => {
    this.setState({
      title: event.target.value
    });

    // When over 4 characters, get a list of movie suggestions
    if (event.target.value.length > 4) {
      this.getMovieTitles(event.target.value);
    } else {
      this.setState({
        movieTitles: null
      });
    }
  };

  handleSubmit = event => {
    // The user hit submit, navigate to:  /movietitle
    event.preventDefault();

    this.props.history.push(`/${slug(this.state.title)}`);

    this.setState({
      title: ""
    });
  };

  onKeyPressed(e) {
    // If user pressed the escape button, hide the suggestionlist
    e.keyCode === 27 && this.closeSuggestions();
  }

  componentWillMount() {
    document.addEventListener("keydown", this.onKeyPressed.bind(this));
  }

  componentDidMount() {
    _isMounted = true;
  }

  componentWillUnmount() {
    _isMounted = false;
    document.removeEventListener("keydown", this.onKeyPressed.bind(this));
  }

  render() {
    const { showSuggestions, title, movieTitles } = this.state;

    return (
      <Wrap>
        <form onSubmit={this.handleSubmit}>
          <div className="searchWrap">
            <input
              value={title}
              onFocus={this.showSuggestions}
              onChange={this.handleChange}
              placeholder={this.props.placeholder || "e.g. The Life Aquatic"}
            />

            <button
              title={
                title ? `Search for "${title}"` : "Enter a movie title first"
              }
              disabled={!title}
              type="submit"
            >
              Search
            </button>
          </div>

          {movieTitles &&
            !!showSuggestions && (
              <SuggestionsList
                closeSuggestions={this.closeSuggestions}
                suggestionClick={this.suggestionClick}
                list={movieTitles}
              />
            )}
        </form>
      </Wrap>
    );
  }
}

export default Search;

// Styling
const Wrap = styled.div`
  form {
    position: relative;
    display: flex;
  }

  .searchWrap {
    position: relative;
    display: flex;
    align-items: center;
  }

  .search {
    display: flex;
  }

  input {
    width: 180px;
    max-width: 100%;
  }

  button {
    margin-left: -1px;
  }
`;

const ListWrap = styled.div`
  position: absolute;
  width: 100%;
  height: 200px;
  background: #fff;
  padding: 10px 10px;
  z-index: 1;
  bottom: 0;
  transform: translateY(100%);
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.3);
  font-size: 0.8em;

  ul {
    overflow-y: scroll;
    height: 100%;
    text-align: left;
  }

  li:first-child {
    padding-right: 60px;
  }

  button {
    border: 0;
    color: grey;
    position: absolute;
    top: 10px;
    right: 10px;

    &,
    &:hover {
      background: none;
    }
  }

  a {
    display: inline-block;
    margin: 5px 0;
    text-decoration: none;
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
  }
`;
