import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

class Article extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    urlToImage: PropTypes.string,
    url: PropTypes.string,
    author: PropTypes.string
  };

  render() {
    const { urlToImage, title, url, description, author } = this.props;

    return (
      <Wrap className="article">
        <div className="section thumb">
          {(urlToImage && <img src={urlToImage} alt={title} />) || " "}
        </div>

        <div className="section">
          <h3>
            <a rel="noopener noreferrer" target="_blank" href={url}>
              {title}
            </a>
          </h3>
          <p>{description}</p>
          <p>- {author}</p>
          <p className="link">
            <a rel="noopener noreferrer" target="_blank" href={url}>
              Read this article
            </a>
          </p>
        </div>
      </Wrap>
    );
  }
}

export default Article;

const Wrap = styled.div`
  display: flex;
  padding: 20px 0;

  &:nth-child(odd) {
    background: rgba(0, 0, 0, 0.05);
  }

  .thumb {
    flex: 0 0 120px;
  }

  .thumb img {
    width: 100%;
  }

  .section {
    padding: 0 10px;
  }

  h3 {
    margin-top: 0;
    font-weight: bold;
    text-align: left;
  }

  h3 a {
    text-decoration: none;
  }

  p {
    margin-bottom: 1em;
  }
`;
