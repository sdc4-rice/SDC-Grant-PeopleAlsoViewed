import React from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';

const slideInFromLeft = keyframes`
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(0);
  }
`;

const slideInFromRight = keyframes`
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(0);
  }
`;

const ItemLi = styled.li`
  display: inline-block;
  vertical-align: top;
  width: 16.666667%;
  animation: ${(props) => {
    if (props.click) {
      return slideInFromLeft;
    }
    return slideInFromRight;
  }} 1s ease-out 0s 1;
`;

const ItemDiv = styled.div`
  border: 1px solid transparent;
  padding: 7px;
  &:hover {
    border: 1px solid #999;
  };
`;

const ItemLink = styled.a`
  display: block;
  text-decoration: none;
`;

const ImageContainerDiv = styled.div`
  background-color: white;
  height: 0;
  padding-top: 100%;
  position: relative;
`;

const ImageInnerDiv = styled.div`
  text-align: center;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
`;

const ItemImage = styled.img`
  max-height: 100%;
  max-width: 100%;
  vertical-align: middle;
  float: left;
`;


const ImageTitleDiv = styled.div`
  font-size: 14px;
  font-weight: 400;
  height: 40px;
  line-height: 20px;
  margin: 5px 0 0 0;
  color: #333;
  overflow: hidden;
  white-space: normal;
  word-break: break-word;
  hyphens: auto;
`;

const ItemPriceP = styled.p`
  font-size: 17px;
  font-weight: 500;
  margin: 8px 0 0 0;
`;

const ItemShippingP = styled.p`
  font-size: 13px;
  margin: 5px 0 0 0;
  font-weight: 400;
  color: #767676;
`;

const ItemOldPriceP = styled(ItemShippingP)`
  text-decoration: line-through;
`;

const AlsoViewedItem = ({
  alsoViewedItem, click,
}) => (
  <ItemLi click={click}>
    <ItemDiv>
      <ItemLink href={alsoViewedItem.itemurl}>

        <ImageContainerDiv>
          <ImageInnerDiv>
            <ItemImage src={alsoViewedItem.image} />
          </ImageInnerDiv>
        </ImageContainerDiv>
        <ImageTitleDiv>
          <span className="mfe-img-helper"></span>
          <span>{alsoViewedItem.title}</span>
        </ImageTitleDiv>

      </ItemLink>

      <ItemPriceP>${alsoViewedItem.currentprice}</ItemPriceP>
      {
        alsoViewedItem.oldprice
          ? <ItemOldPriceP>${alsoViewedItem.oldprice}</ItemOldPriceP>
          : <ItemOldPriceP></ItemOldPriceP>
      }
      {
        alsoViewedItem.freeshipping
          ? <ItemShippingP><span>Free shipping</span></ItemShippingP>
          : <ItemShippingP><span>${alsoViewedItem.shippingcost} Shipping</span></ItemShippingP>
      }
    </ItemDiv>
  </ItemLi>
);

AlsoViewedItem.propTypes = {
  alsoViewedItem: PropTypes.object.isRequired,
  click: PropTypes.bool.isRequired,
};

export default AlsoViewedItem;
