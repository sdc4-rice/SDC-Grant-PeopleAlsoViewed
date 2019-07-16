import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import AlsoViewedItem from './AlsoViewedItem.jsx';

const ItemsListDiv = styled.div`
  overflow: hidden;
  margin: 12px 16px 20px 16px;
  padding: 4px 0;
  position: relative;
`;

const ItemsListUl = styled.ul`
  margin: 0;
  padding: 0;
  position: relative;
  left: 0px;
  clear: both;
`;

const AlsoViewedItemsList = ({
  alsoViewedItems, startIndex, endIndex, click,
}) => (
  <ItemsListDiv>
    <ItemsListUl>
      {
        alsoViewedItems.map((item, index) => {
          if (index >= startIndex && index <= endIndex) {
            return (<AlsoViewedItem alsoViewedItem={item} click={click} />);
          }
          return (<div></div>);
        })
      }
    </ItemsListUl>
  </ItemsListDiv>
);

AlsoViewedItemsList.propTypes = {
  alsoViewedItems: PropTypes.array.isRequired,
  startIndex: PropTypes.number.isRequired,
  endIndex: PropTypes.number.isRequired,
  click: PropTypes.bool.isRequired,
};

export default AlsoViewedItemsList;
