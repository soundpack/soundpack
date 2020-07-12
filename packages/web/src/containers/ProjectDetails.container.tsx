import React, { useEffect } from 'react';
import { Link, Route } from 'react-router-dom';
import styled from 'styled-components';
import ProjectFiles from '../pages/ProjectFiles.page';
// import ProjectOrders from '../pages/ProjectOrders.page';

const Container = styled.div`
  /* background-color: blue; */
`;

const Header = styled.div`
  height: 200px;
`;

const Content = styled.div`
`;

type ProjectDetailsContainerProps = {
  match: any;
};

const ProjectDetailsContainer: React.FC<ProjectDetailsContainerProps> = ({ match }) =>{
  return (
    <Container>
      <Content>
        <Route path={`${match.url}/details`} component={ProjectFiles} />
        {/* <Route path={`${match.url}/orders`} component={ProjectOrders} /> */}
      </Content>
    </Container>
  );
};

export default ProjectDetailsContainer;
