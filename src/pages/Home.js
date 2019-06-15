import React from "react";
import styled from "styled-components";
//
import Search from "../components/Search";
import background from "../images/cinema.jpg";
import vars from "../styling/vars.js";

class Home extends React.Component {
  render() {
    return (
      <Wrap>
        <div className="container">
          <h1>Enter your movie title to find out all about it!</h1>
          <Search {...this.props} placeholder="Your movie title here" />
        </div>
      </Wrap>
    );
  }
}

export default Home;

// Styling
const Wrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: url(${background}) no-repeat center center;
  background-size: cover;

  h1 {
    margin-bottom: 0.5em;
  }

  .container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 10px;
    background: #fff;
  }

  form {
    display: flex;
    align-items: flex-start;
  }

  button {
    margin-left: -2px;
  }

  @media (${vars.minS}) {
    .container {
      padding: 40px;
    }

    h1 {
      font-size: 1.5em;
    }

    .searchWrap {
      display: flex;
      align-items: center;
    }

    input {
      height: 40px;
      font-size: 1.3em;
      width: 200px;
      max-width: 100%;
      padding: 0 0.5em;
      text-align: center;
      width: 400px;
    }

    button {
      height: 40px;
    }
  }
`;
