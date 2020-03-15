import React, { Component }from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import colors from './../styles/colors';
// import logoSrc from './../../assets/images/logo.png';

const Container = styled.div`
  height: 30px;
  position: relative;
  width: ${props => props.width};
  z-index: 100000000000000;
`;

const InsideContainer = styled.div`
  height: ${props => props.open ? 'auto' : '30px'};
  border-radius: 15px;
  background-color: white;
  overflow: ${props => props.open ? 'auto' : 'hidden'};
  padding: 5px 0 0 10px;
  position: absolute;
  width: 100%;
  box-shadow: ${props => props.open ? '0 6px 25px -6px rgba(0,0,0,0.12)' : null};

  &:hover {
    cursor: pointer;
  }
`;

const Item = styled.div`
  font-size: 1.6rem;
  color: ${colors.grey8};
  margin-bottom: 10px;

  &:hover {
    cursor: pointer;
  }
`;

export default class Dropdown extends Component {
  constructor(params){
    super(params);
    this.state = {
      open: false,
    };
  }

  render(){
    let { items, value, onClick, width } = this.props;

    items = items.sort((a, b) => {
      if(a.value === value) return -1;
      if(b.value === value) return 1;
      else return a.value > b.value ? 1 : -1;
    });

    return (
      <Container 
        onClick={() => this.setState({open: !this.state.open})}
        open={this.state.open}
        width={width}
      >
        <InsideContainer open={this.state.open}>
          {items.map((item, index) => {
            return (
              <Item 
                key={index} 
                onClick={() => onClick(item)}
              >
                {item.text || item.name}
              </Item>
            );
          })}
        </InsideContainer>
      </Container>
    );
  }
  
}