import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Page } from '../styles/App';
import styled from 'styled-components';
import colors from '../styles/colors';
import logoSrc from './../assets/images/logo.png';

const Container = styled.div`
  width: 100%
  width: 100%;
  position: relative;
  background-color: ${colors.grey1};
`;

const Navigation = styled.div`
  position: relative;
  height: 50px;
  background-color: ${colors.purple};
  box-shadow: 0 2px 16px 0 rgba(0,0,0,0.25);
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Logo = styled.img`
  height: 35px;
  padding-left: 40px;
`;

const NavigationTitle = styled.div`
  font-size: 1.6rem;
  color:${colors.white};
  font-weight: 600;
`;

const UserProfile = styled.div`
  padding-right: 40px;
  font-size: 1.6rem;
  color:${colors.white};
  font-weight: 600;
`;

const SideBar = styled.div`
  position: relative;
  background-color: ${colors.white};
  height: 100%;
  width: 100px;
`;

const SideBarButton = styled.div`
  font-size: 1.2rem;
  font-weight: 300;
  color: ${colors.grey2};
  padding-left: 20px;
  padding-top: 15px;
  text-transform: uppercase;
`;

const SideBarLinks = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  bottom: 15px;
  width: 100%;
`;

const SideBarLink = styled(Link)`
  font-size: 1rem;
  font-weight: 300;
  color: ${colors.grey3};
`;

const Stage = styled.div`
  display: flex;
  height: calc(100% - 50px);
`;

const Content = styled.div`
  padding: 30px;
  width: 100%;
  overflow-y: scroll;
`;

export default class Dashboard extends Component {
  render() {
    return (
      <Page>
        <Container>
          <Navigation>
            <Logo src={logoSrc} />
            <Link to="/dashboard">
              <NavigationTitle>
                Dashboard
              </NavigationTitle>
            </Link>
            <UserProfile>Sam</UserProfile>
          </Navigation>
          <Stage>
            <SideBar>
              <SideBarButton>Settings</SideBarButton>
              <SideBarButton>Search</SideBarButton>
              <SideBarButton>Help</SideBarButton>
              <SideBarButton>Trash</SideBarButton>
              <SideBarLinks>
                <SideBarLink to="/tos">Contact</SideBarLink>
                <SideBarLink to="/tos">Terms & Privacy</SideBarLink>
              </SideBarLinks>
            </SideBar>
            <Content>{this.props.children}</Content>
          </Stage>
        </Container>
      </Page>
    );
  }
}
