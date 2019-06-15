import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
//
import logoImg from "../images/mm-logo.svg";
import Search from "./Search";
import vars from "../styling/vars.js";

class Header extends React.Component {
  static propTypes = {
    fakeAuth: PropTypes.object.isRequired,
    location: PropTypes.object,
    username: PropTypes.string
  };

  handleLogout = () => {
    this.props.fakeAuth.signout(() => this.props.history.push("/"));
  };

  render() {
    const pathname = this.props.location.pathname;

    return (
      <Wrap>
        <Logo>
          <Link to="/">
            <img src={logoImg} alt="Movie Madness" />
          </Link>

          {pathname !== "/" && <Search {...this.props} />}
        </Logo>

        <Nav>
          <li>
            <Link to="/">Home</Link>
          </li>

          <li>
            <Link to="/tv">TV</Link>
          </li>

          <li>
            <Link to="/about">About</Link>
          </li>

          <li className="auth">
            {this.props.fakeAuth.isAuthenticated && (
              <div>
                {`Logged in as ${this.props.username} `}
                (<a onClick={this.handleLogout}>log out</a>)
              </div>
            )}
          </li>
        </Nav>
      </Wrap>
    );
  }
}

export default Header;

// Styling
const Wrap = styled.div`
  background: #f9f9f9;
  min-height: 160px;
`;

const Logo = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 20px 0;

  img {
    width: 500px;
    max-width: 90%;
    margin-bottom: 1em;
  }

  @media (${vars.minS}) {
    flex-direction: row;
  }
`;

const Nav = styled.ul`
  list-style-type: none;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;

  > li {
    margin-bottom: 10px;
  }

  > li > a {
    padding: 20px;
    text-transform: uppercase;
    color: black;
    text-decoration: none;
    font-family: Alegreya;

    &:hover {
      text-decoration: underline;
    }
  }

  .auth {
    margin-left: 1em;
  }
`;
