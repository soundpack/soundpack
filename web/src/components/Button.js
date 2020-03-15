import React, { Component } from 'react';
import styled from 'styled-components';
import colors from './../styles/colors';
import { Button } from 'semantic-ui-react';

const ButtonStyle = styled.div`
  .ui.button {
    position: relative;
    height: ${props => props.height || '35px'};
    border-radius: 18px;
    background-color: ${props => props.invert ? props.bgColor || colors.purple : props.color || colors.white};
    color: ${props => props.invert ? props.color || colors.white : props.bgColor || colors.purple};
    margin: ${props => props.margin};
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: ${props => props.size || '1.6rem'};
    padding: 0px;
    font-weight: ${props => props.weight || '400'};
    border: ${props => `1px solid ${props.invert ? props.color || colors.white : props.bgColor || colors.white}`};
    width: ${props => props.width};

    &:hover {
      cursor: pointer;
    }
  }
`;

export default function ({ children, ...props }) {
  return (
    <ButtonStyle {...props} onClick={null}>
      <Button {...props} size="large">{children}</Button>
    </ButtonStyle>
  );
}
