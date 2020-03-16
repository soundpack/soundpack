import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import styled from 'styled-components';
import Register from "./containers/Register";
import Login from './containers/Login';
// import Projects from "./containers/Projects";
// import NewProject from "./containers/NewProject";
// import EditProject from "./containers/EditProject";
// import ProjectCards from "./containers/ProjectCards";
// import ProjectDocument from "./containers/ProjectDocument";

const Container = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
`;

export default function App() {
  return (
    <Container>
      <Switch>
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        {/* <Redirect exact to="/dashboard/projects" from="/dashboard" />
        <Route exact path="/dashboard/projects" component={Projects} />
        <Route exact path="/dashboard/projects/new" component={NewProject} />
        <Route exact path="/dashboard/projects/edit" component={EditProject} />
        <Route exact path="/dashboard/projects/cards" component={ProjectCards} />
        <Route exact path="/dashboard/projects/document" component={ProjectDocument} /> */}
      </Switch>
    </Container>
  );
}
