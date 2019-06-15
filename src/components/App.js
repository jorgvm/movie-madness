import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Loadable from "react-loadable";
import styled from "styled-components";
//
import PrivateRoute from "./PrivateRoute";
import Header from "./Header";
import Footer from "./Footer";
import Loading from "./Loading";

/*
  Code splitting on route level, with Loadable
  Useless for this small app, but awesome for bigger projects.
*/
const Home = Loadable({
  loader: () => import("../pages/Home"),
  loading: Loading
});

const About = Loadable({
  loader: () => import("../pages/About"),
  loading: Loading
});

const Movie = Loadable({
  loader: () => import("../pages/Movie"),
  loading: Loading
});

const Tv = Loadable({
  loader: () => import("../pages/Tv"),
  loading: Loading
});

const Login = Loadable({
  loader: () => import("../pages/Login"),
  loading: Loading
});

/*
  Fake authentication
*/
const fakeAuth = {
  isAuthenticated: false,
  username: null,

  authenticate(callback) {
    this.isAuthenticated = true;
    this.username = "Steve";
    setTimeout(callback, 300);
  },

  signout(callback) {
    this.isAuthenticated = false;
    this.username = null;
    setTimeout(callback, 200);
  }
};

class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <Route
            render={props => (
              <Header
                fakeAuth={fakeAuth}
                username={fakeAuth.username}
                {...props}
              />
            )}
          />

          <Main>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route
                path="/login"
                render={props => <Login fakeAuth={fakeAuth} {...props} />}
              />
              <Route path="/about" component={About} />
              <PrivateRoute path="/tv" component={Tv} fakeAuth={fakeAuth} />
              <Route path="/:movieName" component={Movie} />
            </Switch>
          </Main>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;

// Styling
const Main = styled.div`
  > * {
    min-height: calc(100vh - 220px);
    padding: 2em 10px;
  }

  .container {
    max-width: 1000px;
    margin: 0 auto;
  }
`;
