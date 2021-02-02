import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import {Reset} from 'styled-reset';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: transparent;
  outline: none;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji',
    'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
  word-spacing: 1.3;
  font-size: 15px;
  line-height: 23px;
  font-weight: normal;
  padding: 5px;
  box-sizing: border-box;
  overflow-x: hidden;

  @media (max-width: 1281px) {
    font-size: 14px;
    line-height: 22px;
  }
`;

function App() {
  return (
    <React.Fragment>
      <Reset />
      <Container contentEditable />
    </React.Fragment>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
