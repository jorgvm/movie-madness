import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Redirect, Prompt } from "react-router-dom";
//

/*
  A login page, merely to show off the Private Route component, using the fake
  authentication in App.js.

  Also using a Prompt, normally wouldn't in this scenario, but it's fun to use.
*/

class Login extends React.Component {
  static propTypes = {
    fakeAuth: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired
  };

  state = {
    redirectToReferrer: false,
    blockingNavigation: true
  };

  login = event => {
    event && event.preventDefault();

    this.props.fakeAuth.authenticate(() => {
      this.setState({
        redirectToReferrer: true
      });
    });
  };

  render() {
    const { redirectToReferrer, blockingNavigation } = this.state;
    const { from } = this.props.location.state || { from: { pathname: "/" } };

    if (redirectToReferrer) {
      return <Redirect to={from} />;
    }

    if (this.props.fakeAuth.isAuthenticated) {
      return <Redirect to={"/"} />;
    }

    return (
      <Wrap className="container">
        <div>You have to login to view the page {from.pathname}</div>
        <div>
          Here at Movie Madness&trade; we believe in providing the fastest
          authentication possible, so we went ahead and filled that form in for
          you.
        </div>

        <form onSubmit={this.login}>
          <Prompt
            when={blockingNavigation}
            message={location =>
              `You haven't logged in yet, are you sure you want to navigate to ${
                location.pathname === "/" ? "home" : location.pathname
              }?`
            }
          />

          <div className="field">
            <div>Username:</div>
            <input value={"Steve"} disabled={true} />
          </div>

          <div className="field">
            <div>Password:</div>
            <input type="password" value={"doesntmatter"} disabled={true} />
          </div>

          <button onClick={this.login}>Log in</button>
        </form>
      </Wrap>
    );
  }
}

const Wrap = styled.div`
  text-align: center;

  > div,
  form > div {
    max-width: 400px;
    margin: 1em auto;
  }
`;

export default Login;
