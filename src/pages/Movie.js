import React from "react";
import styled from "styled-components";
import { parse } from "query-string";
//
import Loading from "../components/Loading.js";
import Article from "../components/Article";
import api from "../utils/api";
import vars from "../styling/vars";

/*
  This page shows the details of a movie, a poster, rating, etc.

  The information is requested either with a search term, or with a specific
  imdb Id (when the user clicks on a suggestion in the search bar).
*/

const Detail = props => {
  return !props.children || props.children === "N/A" ? null : (
    <div className="detail">
      <div className="detail__title">{props.title}:</div>
      <div className="detail__item">{props.children}</div>
    </div>
  );
};

// Check if mounted
let _isMounted = true;

class Movie extends React.Component {
  state = {
    loading: true,
    error: null,
    movie: null,
    news: null,
    newsError: null,
    newsLoading: true
  };

  getMovieData(paramsTitle, queryId) {
    // Get the movie data (description, poster, rating, ...)
    this.setState({
      loading: true,
      movie: null,
      error: null
    });

    api.movieData(paramsTitle, queryId).then(results => {
      if (!_isMounted) return null;

      if (results.error) {
        // Failure
        this.setState({ loading: false, error: results.error });
      } else {
        // Success
        this.setState({ loading: false, movie: results.data });

        // Search for news, using the title supplied by api
        this.getMovieNews(results.data.Title);
      }
    });
  }

  getMovieNews(movie) {
    // Try to find news using the movie title as query
    this.setState({
      news: null,
      newsLoading: true,
      newsError: null
    });

    api.movieNews(movie).then(({ error, articles }) => {
      if (!_isMounted) return null;

      if (error) {
        this.setState({
          newsError: error,
          newsLoading: false
        });
      } else {
        this.setState({
          news: articles,
          newsLoading: false
        });
      }
    });
  }

  componentDidMount() {
    _isMounted = true;

    this.getMovieData(
      this.props.match.params.movieName,
      parse(this.props.location.search).id
    );
  }

  componentWillReceiveProps(nextProps) {
    this.getMovieData(
      nextProps.match.params.movieName,
      parse(nextProps.location.search).id
    );
  }

  componentWillUnmount() {
    _isMounted = false;
  }

  render() {
    const { movie, loading, error, news, newsError, newsLoading } = this.state;

    // Loading
    if (loading) return <Loading />;

    // Error
    if (error)
      return (
        <div className="container textCenter">
          <h2>Oops, something didn't go quite right:</h2>
          {error}
        </div>
      );

    // Success
    // Get ratings in two digit format from all sources
    const ratings = movie.Ratings.map(
      ({ Value, Source }) =>
        Number.isInteger(parseFloat(Value))
          ? { source: Source, score: parseFloat(Value) }
          : { source: Source, score: parseFloat(Value) * 10 }
    );

    // Calculate average
    const averageRating =
      Math.round(
        ratings.reduce((acc, val) => acc + val.score, 0) / ratings.length
      ) || null;

    return (
      <Wrap className="container">
        <Intro>
          <div className="section rating">
            {(averageRating && averageRating + "%") || "-"}
          </div>

          <div className="section poster">
            {(movie.Poster !== "N/A" && (
              <img src={movie.Poster} alt={"Poster of " + movie.Title} />
            )) ||
              "(no image available)"}
          </div>

          <div className="section">
            <h1>
              {movie.Title} <span>({movie.Year})</span>
            </h1>
            <div className="description">
              {(movie.Plot !== "N/A" && movie.Plot) ||
                "(no description available)"}
            </div>
          </div>
        </Intro>

        <Details>
          <Detail title="Actors">{movie.Actors}</Detail>
          <Detail title="Runtime">{movie.Runtime}</Detail>
          <Detail title="Director">{movie.Director}</Detail>
          <Detail title="Genre">{movie.Genre}</Detail>
          <Detail title="Writer">{movie.Write}</Detail>
          <Detail title="Rating">
            {(ratings.length && (
              <ul>
                {ratings.map(v => (
                  <li key={v.source}>
                    {v.source}: {v.score}/100
                  </li>
                ))}
              </ul>
            )) ||
              "No rating info available"}
          </Detail>
        </Details>

        <News>
          <h2>News articles related to the subject "{movie.Title}"</h2>

          {newsError && <p className="textCenter">{newsError}</p>}

          {newsLoading && <Loading />}

          {!!news &&
            !news.length &&
            !newsError &&
            !newsLoading && <p className="textCenter">Sorry, no news found</p>}

          <div className="articles">
            {news && news.map(item => <Article key={item.url} {...item} />)}
          </div>
        </News>
      </Wrap>
    );
  }
}

export default Movie;

//Styling
const Wrap = styled.div`
  h1 {
    font-size: 2em;
    text-align: left;
    margin-top: 0;

    span {
      font-size: 0.8em;
      opacity: 0.7;
    }
  }
`;

const Intro = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  .section {
    flex: 1 1 auto;
  }

  .rating {
    font-size: 2em;
  }

  .poster {
    margin: 1em 0;
    height: 200px;
  }

  .description {
    max-width: 300px;
    width: 100%;
  }

  img {
    width: auto;
    height: 100%;
  }

  @media (${vars.minS}) {
    flex-direction: row;
    .section {
      padding: 0 40px;
    }

    .rating {
      font-size: 3em;
    }

    .poster {
      flex: 0 0 310px;
      height: auto;
    }

    img {
      height: auto;
      width: 100%;
    }
  }
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  margin: 3em auto 0;
  max-width: 400px;

  .detail {
    display: flex;
    margin: 0.5em 0;
  }

  .detail__title {
    font-weight: bold;
    flex: 0 0 90px;
  }
`;

const News = styled.div`
  margin-top: 4em;

  h2 {
    border-bottom: 2px solid black;
  }

  .articles {
    background: #f9f9f9;
  }
`;
