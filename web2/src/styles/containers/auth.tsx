import React, { ReactNode } from'react';
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Colors } from "./../Colors";
import logoSrc from "./../../assets/images/logo-wide.png";
import backgroundImageSrc from "./../../assets/images/bg-image.jpeg";
import * as Polished from 'polished';

export const AuthContainer = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-image: url(${backgroundImageSrc});
  background-position: left;
`;

export const Overlay = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  background-color: ${Polished.rgba(Colors.DarkBlue, 0.90)};
`;

export const Container = ({ children }: { children: ReactNode }) => (
  <AuthContainer>
    <Overlay />
    {children}
  </AuthContainer>
);

export const HeaderContainer = styled.div`
  height: 25vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

export const Header = () => (
  <HeaderContainer>
    <Logo />
  </HeaderContainer>
);

const LogoContainer = styled.div`
  margin-bottom: 20px;
`;

const LogoImg = styled.img`
  position: relative;
  width: 300px;
`;

export const Logo = () => (
  <LogoContainer>
    <Link to="/">
      <LogoImg src={logoSrc} />
    </Link>
  </LogoContainer>
);

export const Content = styled.div`
  width: 320px;
  padding-top: 10px;
`;

export const Row = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  margin-bottom: 10px;
  width: 100%;
`;

type FlexProps = {
  flex: string;
}

export const Flex = styled.div<FlexProps>`
  flex: ${props => props.flex};
`;
export const Spacer = styled.div`
  flex: 0.05;
`;

export const Text = styled.div`
  color: ${Colors.Grey1};
  font-size: 1.2rem;
  font-weight: 500;
`;

export const Footer = styled.div`
  margin: 20px 0 10px;
`

export const ErrorText = styled.div`
  color: ${Colors.Red};
  font-size: 1.2rem;
  font-weight: 500;
  margin: 20px 0;
  text-align: center;
`;