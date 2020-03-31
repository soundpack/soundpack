import React, { useEffect } from 'react';
import { Link, Route } from 'react-router-dom';
import styled from 'styled-components';
// import ProjectAudience from '../pages/ProjectAudience.page.';
// import ProjectOrders from '../pages/ProjectOrders.page';

const Container = styled.div`
  background-color: blue;
`;

const Header = styled.div`
  height: 200px;
  background-color: pink;
`;

const Content = styled.div`
`;

type ProjectDetailalsContainerProps = {
  match: any;
};

const ProjectDetailsContainer: React.FC<ProjectDetailalsContainerProps> = ({ match }) =>{
  return (
    <Container>
      <Header>
        <Link to={`${match.path}`}>Dashboard</Link>
        <Link to={`${match.path}/audience`}>Projects</Link>
      </Header>
      <Content>
        {/* <Route path={`${match.url}/audience`} component={ProjectAudience} />
        <Route path={`${match.url}/orders`} component={ProjectOrders} /> */}
      </Content>
    </Container>
  );
};

export default ProjectDetailsContainer;
