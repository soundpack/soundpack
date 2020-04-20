import React from "react";
import styled from "styled-components";
import MainNavigation from './MainNavigation';
import { Colors } from "../styles/Colors";

const Container = styled.div`
  position: absolute;
  display: flex;
  height: 100vh;
  width: 100vw;
`;

const Content = styled.div`
  background-color: ${Colors.White};
  width: 100%;
  height: 100%;
  overflow: scroll;
`;

type DashboardLayoutProps = {
  children: React.ReactNode,
};

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <Container>
      <MainNavigation />
      <Content>{children}</Content>
    </Container>
  );
};

export default DashboardLayout;
