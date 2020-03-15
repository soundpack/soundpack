import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Flex, Error } from './../styles/App';
import styled from 'styled-components';
import colors from '../styles/colors';
import { Link } from 'react-router-dom';
// import Button from './Button';
import client from '../util/client';

const Container = styled.div`
  position: relative;
  width: 345px;
  margin-bottom: 25px;
  height: 190px;
  background-color: ${props => props.bgColor};
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: ${props => props.bgColor};
  border-radius: 2px 2px 0 0;
  height: 40px;
  padding: 0 10px;
`;

const Title = styled.div`
  border-radius: 2px;
  padding: 5px 10px;
  background-color: rgba(255,255,255,0.8);
  color: ${colors.grey9};
  font-size: 1.6rem;
  font-weight: 500;
`;

const Edit = styled.div`
  color: ${colors.white};
`;

const Content = styled.div`
  background-color: white;
  border-radius: 0 0 2px 2px;
  font-size: 1.4rem;
  color: ${colors.grey9};
  height: 150px;
  padding: 10px;
`;


const Actions = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  bottom: 10px;
`;
const Button = styled.div`
  position: relative;
  height: ${props => props.height || '25px'};
  border-radius: 18px;
  background-color: ${colors.grey10};
  color: ${colors.grey9};
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
  padding: 0px;
  width: ${props => props.width};
  text-transform: uppercase;
  margin: ${props => props.margin};

  &:hover {
    cursor: pointer;
  }
`;

const DeleteMessage = styled.div`
  color: ${colors.grey10};
  font-weight: 400;
  font-size: 1.6rem;
  text-align: center;
  width: 275px;
`;

const Bold = styled.span`
  font-weight: 600;
`;

export default class ProjectCard extends Component {
  constructor(params) {
    super(params);
    this.state = {
      errorMsg: null,
      deleting: false,
    };
  }
  
  async deleteProject() {
    try {
      await client.deleteProject(this.props.project._id);
      await this.props.refetchProjects();
    } catch (errorMsg) {
      this.setState({ errorMsg });
    }
  }

  render() {
    const { _id, name, type, summary, color } = this.props.project;

    const trunc = (text, length) => text.length > length ? text.substring(0, length) + '...' : text;

    if(this.state.deleting) {
      return (
        <Container bgColor={colors.green}>
          <Flex 
            align="center" 
            justify="center" 
            direction="column"
            height="100%"
            
          >
            <DeleteMessage>
              Are you sure you want to delete <Bold>{name}?</Bold>&nbsp;
              You will be unable to access this project in the future
            </DeleteMessage>
            <Flex
              align="center"
              justify="center"
              direction="row"
              margin="20px 0 0"
              >
              <Button
                width="45px"
                margin="0 10px 0 0"
                onClick={() => this.setState({ deleting: false })}
              >
                NO
            </Button>
              <Button
                width="45px"
                onClick={() => this.deleteProject()}
              >
                YES
            </Button>
            </Flex>
            
          </Flex>
          
        </Container>
      );
    }

    return (
      <Container>
        <Header bgColor={color}>
          <Title>{name}</Title>
          <Link to={`/dashboard/projects/edit?projectId=${_id}`}>
            <Edit>Edit</Edit>
          </Link>
        </Header>
        <Content>
          {trunc(summary, 200)}
          <Actions>
            <Link to={`/dashboard/projects/cards?projectId=${_id}`}>
              <Button width="130px" margin="0 10px 0 0">Work on Project</Button>
            </Link>
            <Button 
              width="65px"
              onClick={() => this.setState({ deleting: true })}>Delete</Button>
          </Actions>
        </Content>
      </Container>
    );
  }
}
