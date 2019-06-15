import axios from "axios";

const omdbApiKeypass = "3bab052f";
const omdbUrl =
  "https://www.omdbapi.com/" +
  "?type=movie" +
  "&plot=full" +
  "&apikey=" +
  omdbApiKeypass;

const omdbUrlTitles =
  "https://www.omdbapi.com/" +
  "?type=movie" +
  "&apikey=" +
  omdbApiKeypass +
  "&s=";

const newsUrl =
  "https://newsapi.org/v2/everything" +
  "?sources=entertainment-weekly,metro,newsweek,the-new-york-times,wired,usa-today" +
  "&pageSize=10" +
  "&sortBy=relevancy" +
  "&language=en" +
  "&apiKey=30cdabe0d5454922a52bf34d94ca4147" +
  "&q=";

const tvMazeUrl = "https://api.tvmaze.com/schedule?country=US";

// Get the TV schedule, no parameters
function getTvSchedule() {
  return axios
    .get(tvMazeUrl)
    .then(function(resp) {
      if (resp && resp.status !== 200) {
        return {
          error: "No content available at this time"
        };
      } else {
        return {
          data: resp.data
        };
      }
    })
    .catch(function(error) {
      return {
        error: String(error) || "Unknown error"
      };
    });
}

// Get specific information on a movie, searching by title or id
function getMovieData(paramsTitle, queryId) {
  /*
    If there's a queryId, use it to lookup the movie
    If not, use the paramsTitle to searching
  */
  const query = queryId ? "&i=" + queryId : "&t=" + paramsTitle;

  return axios
    .get(omdbUrl + query, { timeout: 10000 })
    .then(function(resp) {
      if (resp.data && resp.data.Error) {
        return {
          error: resp.data.Error
        };
      } else {
        return {
          data: resp.data
        };
      }
    })
    .catch(function(error) {
      return {
        error: error.message || "Unknown error"
      };
    });
}

// Search for a movie title and get a list of movie titles and id's
function getMovieTitles(movie) {
  return axios
    .get(omdbUrlTitles + movie)
    .then(function(resp) {
      if (resp.data && resp.data.Error) {
        return {
          error: resp.data.Error
        };
      } else {
        /*
          Unfortunately, this API sometimes gives double results.
          Manually filter double id's here
        */
        let usedIds = [];
        const filteredMovieTitles =
          resp.data.Search &&
          resp.data.Search.filter(item => {
            if (usedIds.indexOf(item.imdbID) === -1) {
              usedIds.push(item.imdbID);
              return true;
            } else {
              return false;
            }
          });

        return {
          titles: filteredMovieTitles
        };
      }
    })
    .catch(function(error) {
      return {
        error: error.message || "Unknown error"
      };
    });
}

/*
  Get news related to a movie title.

  Due to the sources, the results are often not movie related, but again, this
  api is just to have some fun with React and test functionality.
*/
function getMovieNews(movie) {
  return axios
    .get(`${newsUrl}+"${movie}"`)
    .then(function(resp) {
      return resp.data.status === "ok"
        ? { articles: resp.data.articles }
        : null;
    })
    .catch(function(error) {
      return {
        error: error.message || "Unknown error"
      };
    });
}

export default {
  movieData: function(paramsTitle, queryId) {
    return getMovieData(paramsTitle, queryId);
  },
  movieTitles: function(movie) {
    return getMovieTitles(movie);
  },
  movieNews: function(movie) {
    return getMovieNews(movie);
  },
  tvSchedule: function() {
    return getTvSchedule();
  }
};
