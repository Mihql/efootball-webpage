import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    background: #000; /* Black background */
    // color: #fff; /* White text */
    margin: 0;
    font-family: Arial, sans-serif;
  }

  input, button, select, textarea {
    color: #000; /* Ensure input text is visible */
  }
`;

export default GlobalStyle;
