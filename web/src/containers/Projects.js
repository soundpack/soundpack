import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import colors from '../styles/colors';
import { Link } from 'react-router-dom';
import Layout from './Layout'
import Button from '../components/Button';
import client from '../util/client';
import ProjectCard from '../components/ProjectCard';

const Content = styled.div`
  display: flex;
  justify-content: center;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const Header = styled.div`
  border-bottom: 3px solid ${colors.grey4};
  height: 50px;
  width: 705px;
  display: flex;
  align-items: center;
  justify-content: space-between;  
`;

const Title = styled.div`
  color: ${colors.grey5};
  font-size: 2.4rem;
`;

const SortContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;  
`;

const SortBy = styled.div`
  font-size: 1.6rem;
  color: ${colors.grey6};
  font-weight: 300;
  margin-right: 10px;
  margin-left: -70px;
`;

const Body = styled.div`
  width: 705px;
  position: relative;
  display: flex;
  flex-wrap: wrap;
  margin-top: 20px;
  justify-content: space-between;

  &:nth-child(2) {
    margin-right: 0px;
  }
`;

export default class Dashboard extends Component {
  constructor(params) {
    super(params);
    this.state = {
      projects: [],
      loading: true,
      errorMsg: null,
    };

    this.listProjects();
  }
  async listProjects(){
    try {
      const projects = await client.listProjects();
      this.setState({projects, loading: false});
    } catch(errorMsg) {
      this.setState({ errorMsg });
    }
  }

  render() {
    return (
      <Layout>
        <Content>
          <Header>
            <Title>Projects</Title>
            <SortContainer>
              <SortBy>
                SORT BY:
              </SortBy>
              <Button
                width="90px"
                height="25px"
                weight="500"
                size="1.2rem"
              >
                RECENT
              </Button>
            </SortContainer>
            <Button
              invert
              width="80px"
              height="30px"
              weight="600"
              size="1.6rem"
              onClick={() => this.props.history.push('/dashboard/projects/new')}
            >
              NEW
            </Button>
          </Header>
          <Body>
            {this.state.projects.map((project, index) => (
              <ProjectCard 
                key={index}
                project={project}
                refetchProjects={() => this.listProjects()}
              />
            ))}
          </Body>
        </Content>
      </Layout>
    );
  }
}
