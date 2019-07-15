import React from 'react';
import ReactDOM from 'react-dom';
import styled, { createGlobalStyle } from 'styled-components';
// import sampleAlsoViewedItems from './sampleAlsoViewed.js'
import AlsoViewedItemsCard from './components/AlsoViewedItemsCard.jsx';
// "import/extensions": ['error', 'always', {ignorePackages: true} ],
// ,
//   rules: {
//     "import/extensions": ["off", "never"],
//     "import/no-named-as-default": "off",
//     "import/no-unresolved": "off",
//     "no-undef": "off",
//     "prefer-template": "off",
//     "no-console": "off",
//     "react/forbid-prop-types": "off",
//     "react/jsx-one-expression-per-line": "off"
//   }

const GlobalStyle = createGlobalStyle`
  body {
    @import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css");
    font-family: "Helvetica neue",Helvetica,Verdana,Sans-serif;
  }
`;

const MainDiv = styled.div`
  display: block;
`;

const PositionDiv = styled.div`
  position: relative;
  overflow: hidden;
`;

const GroupDiv = styled.div`
  margin: 32px 0;
`;

const MainCardDiv = styled.div`
  margin-left: -8px;
  margin-right: -8px;
`;

const App = function () {
  return (
    <MainDiv>
      <GlobalStyle />
      <PositionDiv>
        <GroupDiv>
          <MainCardDiv>
            <AlsoViewedItemsCard />
          </MainCardDiv>
        </GroupDiv>
      </PositionDiv>
    </MainDiv>
  );
};

ReactDOM.render(<App />, document.getElementById('app'));
