import React from "react";
import styled, { keyframes } from "styled-components";
//
import loadingImage from "../images/loading-circle.svg";

const Loading = () => {
  return (
    <div>
      <Loader />
    </div>
  );
};

export default Loading;

// Styling
const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const Loader = styled.div`
  width: 50px;
  height: 50px;
  background: url(${loadingImage}) no-repeat center center;
  background-size: cover;
  animation: ${spin} infinite 1s linear;
  margin: 0 auto;
`;
