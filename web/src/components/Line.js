import React from 'react';
import styled from 'styled-components';
import colors from '../styles/colors';

/*==================================================
* Top
==================================================*/

const Top = {
  topBorder: ({ rightEnd, leftEnd, firstRow, lastRow, lastCard }) => {
    if(lastCard) return null;
    if(leftEnd) return null;
    return `2px solid ${colors.grey4}`

  },
  bottomBorder: ({ rightEnd, leftEnd, firstRow, lastRow, lastCard }) => {
    if(lastCard) return null;
    if (leftEnd) return `2px solid ${colors.grey4}`;
  },
  leftBorder: ({ rightEnd, leftEnd, firstRow, lastRow, lastCard }) => {
    // if(lastCard) return null;
    if(leftEnd && !firstRow) {
      return `2px solid ${colors.grey4}`;
    }
  },
  rightBorder: ({ rightEnd, leftEnd, firstRow, lastRow, lastCard }) => {
    if(lastCard) return null;
    if (rightEnd) return `2px solid ${colors.grey4}`;
    else return null
  },
  width: ({ rightEnd, leftEnd, firstRow, lastRow, lastCard }) => {
    if(lastCard) return null;
    if(rightEnd) return '60%';
    else return '100%';
  },
  top: ({ rightEnd, leftEnd, firstRow, lastRow, lastCard }) => {
    // if(lastCard) return null;
    if(leftEnd) return '-35px';
  },

}

const TopLineStyle = styled.div`
  position: relative;
  height: 100%;
  border-top: ${props => Top.topBorder(props)};
  border-bottom: ${props => Top.bottomBorder(props)};
  border-left: ${props => Top.leftBorder(props)};
  border-right: ${props => Top.rightBorder(props)};
  
  width: ${props => Top.width(props)};
  top: ${props => Top.top(props)};
`;

export function TopLine({rightEnd, leftEnd, firstRow, lastRow, lastCard}) {
  return (
    <TopLineStyle
      rightEnd={rightEnd}
      leftEnd={leftEnd}
      firstRow={firstRow}
      lastRow={lastRow}
      lastCard={lastCard}
    /> 
  );
}

/*==================================================
* Bottom
==================================================*/


const Bottom = {
  topBorder: ({ rightEnd, leftEnd, firstRow, lastRow, lastCard }) => {
    if(lastCard) return null;
    // return `2px solid ${colors.grey4}`

  },
  bottomBorder: ({ rightEnd, leftEnd, firstRow, lastRow, lastCard }) => {
    if(lastCard) return null;
    if(lastRow) return;
    return `2px solid ${colors.grey4}`;

  },
  leftBorder: ({ rightEnd, leftEnd, firstRow, lastRow, lastCard }) => {
    if(lastCard) return null;

  },
  rightBorder: ({ rightEnd, leftEnd, firstRow, lastRow, lastCard }) => {
    if(lastCard) return null;
    if (rightEnd) return `2px solid ${colors.grey4}`;
    else return null
  },
  width: ({ rightEnd, leftEnd, firstRow, lastRow, lastCard }) => {
    if(lastCard) return null;
    if (rightEnd) return '60%';
    else return '100%';
  },
}

const BottomLineStyle = styled.div`
  position: relative;
  height: 100%;
  border-top: ${props => Bottom.topBorder(props)};
  border-bottom: ${props => Bottom.bottomBorder(props)};
  border-left: ${props => Bottom.leftBorder(props)};
  border-right: ${props => Bottom.rightBorder(props)};
  width: ${props => Bottom.width(props)};
`;

export function BottomLine({ rightEnd, leftEnd, firstRow, lastRow, lastCard}) {
  return (
    <BottomLineStyle
      rightEnd={rightEnd}
      leftEnd={leftEnd}
      firstRow={firstRow}
      lastRow={lastRow}
      lastCard={lastCard}
    />
  );
}
