import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
//
import vars from "../styling/vars.js";

class Footer extends React.Component {
  render() {
    return (
      <Wrap>
        <div> Movie Madness&trade; {new Date().getFullYear()}</div>

        <div>powered by newsapi.org, tvmaze &amp; omdbapi.com</div>

        <Link to="/about">What is all this?</Link>
      </Wrap>
    );
  }
}

export default Footer;

// Styling
const Wrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #f9f9f9;
  padding: 20px;
  height: 60px;
  font-size: 0.8em;

  @media (${vars.maxS}) {
    flex-direction: column;
    height: auto;

    > * {
      text-align: center;
      margin-bottom: 20px;
    }
  }
`;
