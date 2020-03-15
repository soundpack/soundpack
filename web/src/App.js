import 'semantic-ui-css/semantic.min.css'
import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import LandingPage from "./containers/LandingPage";
import Register from "./containers/Register";
import Login from './containers/Login';
import Projects from "./containers/Projects";
import NewProject from "./containers/NewProject";
import EditProject from "./containers/EditProject";
import ProjectCards from "./containers/ProjectCards";
import ProjectDocument from "./containers/ProjectDocument";
import { AppContainer } from './styles/App';

class App extends Component {
  render() {
    return (
      <AppContainer>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Redirect exact to="/dashboard/projects" from="/dashboard" />
          <Route exact path="/dashboard/projects" component={Projects} />
          <Route exact path="/dashboard/projects/new" component={NewProject} />
          <Route exact path="/dashboard/projects/edit" component={EditProject} />
          <Route exact path="/dashboard/projects/cards" component={ProjectCards} />
          <Route exact path="/dashboard/projects/document" component={ProjectDocument} />
        </Switch>
      </AppContainer>
    );
  }
}

export default App;
