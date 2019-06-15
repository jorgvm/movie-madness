import React from "react";
import PropTypes from "prop-types";
import { Redirect, Route } from "react-router-dom";

/*
  A basic "private route" component: depending on authentication, either send 
  the user to the login page, or to the requested path.
*/

class PrivateRoute extends React.Component {
  static propTypes = {
    location: PropTypes.object,
    component: PropTypes.func.isRequired,
    fakeAuth: PropTypes.object.isRequired
  };

  render() {
    const { component: Component, fakeAuth, ...rest } = this.props;

    return (
      <Route
        {...rest}
        render={props =>
          fakeAuth.isAuthenticated === true ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: {
                  from: this.props.location
                }
              }}
            />
          )
        }
      />
    );
  }
}

export default PrivateRoute;
