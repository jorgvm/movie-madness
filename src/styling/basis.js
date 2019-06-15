// Some common CSS
const basis = `
  html {
    box-sizing: border-box;
  }

  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }

  html,
  body {
    margin: 0;
    padding: 0;
    min-height: 100%;
  }

  body {
    font-family: "Open Sans", Roboto, Arial, sans-serif;
    line-height: 1.4;
  }

  a {
    color: inherit;
    text-decoration: underline;
    cursor: pointer;

    &:hover {
      text-decoration: none;
    }
  }

  img {
    vertical-align: top;
  }

  .noun-un {
    text-decoration: none;

    &:hover{
      text-decoration: underline;
    }
  }

	h1,h2 {
		font-family: Alegreya;
		margin-bottom: 1em;
		text-align: center;
	}


	h1 {
		font-size: 1.5em;
	}

	h2 {
		font-size: 1.3em;
	}

  input,textarea {
    border: 1px solid #DADAD7;
    padding: 0 0.5em;
  }

  input {
    background: #fff;
    height: 24px;
  }

  .textCenter {
    text-align: center;
  }

  button {
    background: #43ab9a;
    border-radius: 3px;
    color: #fff;
    padding: 0px 5px;
    height: 24px;

    &:hover {
      background: #268474;
    }

    &[disabled] {
      background: grey;
    }
  }
`;

export default basis;
