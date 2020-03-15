import React, { Component } from 'react';
import styled from 'styled-components';
import colors from './../styles/colors';


const Container = styled.div`
  padding: 5px;
  border-radius: 15px;
  background-color: white;
  display: flex;
  align-items: center;
  width: max-content;  
`;

const Dot = styled.div`
  height: ${props => props.active ? '25px': '20px'};
  width: ${props => props.active ? '25px' : '20px'};
  background-color: ${props => props.bgColor};
  border-radius: 50%;
  margin: 0 2px;
  /* transition: all 0.2s; */

  &:hover {
    cursor: pointer;
  }
`;

export default function SelectColor({value, onChange}) {
  const colorList = [
    colors.lightblue,
    colors.darkred,
    colors.orange,
    colors.yellow,
    colors.red,
    colors.pink,
    colors.lightpurple,
    colors.green,
    colors.redpurple,
  ];

  return (
    <Container>
      {colorList.map((color, index) => 
        <Dot 
          key={index}
          active={color === value} 
          bgColor={color}
          onClick={() => onChange(color)}
        />
      )}
    </Container>
  );
}

