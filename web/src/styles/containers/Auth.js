import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import colors from './../colors';
import logoSrc from './../../assets/images/logo.png';

export const Container = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Label = styled.div`
  font-size: 1.4rem;
  color: ${colors.white};
  font-weight: 300;
`;

export const Form = styled.div`
  width: ${props => props.small ? '265px' : '465px'};
  position: relative;
  margin-top: -20px;
`;

export const FormItem = styled.div`
  position: relative;
  width: 100%;
  flex:1;
`;

export const Header = styled.h1`
    margin: 0 0 2rem;
    text-transform: inherit;
    text-align: center;
`;

export const Text = styled.div`
  text-align: center;
  margin: 2rem 0 1.5rem;
  color: ${colors.white};
`;


const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 40px;
`;

const LogoImg = styled.img`
position: relative;
  height: 140px;
  margin: 0 auto;
`;

export const Logo = () => (
  <LogoContainer>
    <Link to="/">
      <LogoImg src={logoSrc} />
    </Link>
  </LogoContainer>
);