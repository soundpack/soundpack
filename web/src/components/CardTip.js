import React, { Component } from 'react';
import styled from 'styled-components';
import colors from './../styles/colors';

const Container = styled.div`
  position: absolute;
  height: 100%;
  border-radius: 4px;
  background-color: white;
  height: 30px;
  width: 30px;
  top: -15px;
  z-index: 10000;
  box-shadow: 0 8px 11px -7px rgba(0,0,0,0.08);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  overflow: hidden;
`;

const CardTipBottom = styled.div`
  position: relative;
  height: 5px;
  width: 100%;
  background-color: ${props => props.color};
`;

export default function CardTip({ color }) { 
  return (
    <Container>
      <CardTipBottom color={color} />
    </Container>
  );
}
