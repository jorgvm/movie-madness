import React from "react";
import styled from "styled-components";

/*
  Withing wysiwyg you can use styles for text sections. Lists, etc.
*/

class Wysiwyg extends React.Component {
  render() {
    return <Wrap>{this.props.children}</Wrap>;
  }
}

export default Wysiwyg;

const Wrap = styled.div`
  max-width: 500px;
  margin: 0 auto;

  ul,
  p {
    margin-bottom: 1em;
  }

  ul {
    list-style: disc inside;
  }
`;
