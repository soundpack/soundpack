import React, { Component } from 'react';
import styled from 'styled-components';
import colors from './../styles/colors';
import { Flex, Error } from './../styles/App';
import { Link } from 'react-router-dom';
import Layout from './Layout'
import Button from '../components/Button';
import SelectColor from '../components/SelectColor';
import Dropdown from '../components/Dropdown';
import client from './../util/client';

const Content = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const Header = styled.div`
  border-bottom: 3px solid ${colors.grey4};
  height: 50px;
  width: 500px;
  display: flex;
  align-items: center;
  justify-content: space-between;  
  margin-bottom: 20px;
`;

const Title = styled.div`
  color: ${colors.grey5};
  font-size: 2.4rem;
`;

const Body = styled.div`
  width: 500px;
  position: relative;
`;

const Section = styled.div`
  margin-bottom: 20px;
  /* position: relative; */
`;

const Label = styled.div`
  color: ${colors.grey7};
  font-weight: 300;
  font-size: 1.6rem;
  margin-bottom: 10px;
`;

const Input = styled.input`
  background: ${colors.white};
  font-size: 1.6rem;
  color: ${colors.grey8};
  height: 30px;
  border: 0px;
  outline: 0px;
  width: 100%;
  position: relative;
  padding-left: 10px;

`;

const Summary = styled.textarea`
  border: 0px;
  outline: 0px;
  width: 100%;
  min-height: 200px;
  padding: 15px;
`;

export default class NewProject extends Component {
  constructor(params){
    super(params);
    this.state = {
      name: '',
      type: 'Cover Letter',
      color: colors.red,
      summary: '',
      errorMsg: null
    }
  }
  
  async createProject() {
    const newProject = {
      name: this.state.name,
      type: this.state.type,
      color: this.state.color,
      summary: this.state.summary,
    };

    try {
      await client.createProject(newProject);
      this.props.history.push('/dashboard/projects');
    } catch(errorMsg) {
      this.setState({ errorMsg });
      
    }
  }

  setKey(key, value) {
    this.setState({
      [key]: value,
      errorMsg: null,
    })
  }
  
  render() {

    const types = [
      {
        text: 'Cover Letter',
        value: 'Cover Letter',
      },
      // {
      //   text: 'College Application Essay: Life Changing Event',
      //   value: 'College Application Essay: Life Changing Event',
      // },
      // {
      //   text: 'College Application Essay: Focusing on Theme',
      //   value: 'College Application Essay: Focusing on Theme',
      // },
      // {
      //   text: 'Memior',
      //   value: 'Memior',
      // },
      // {
      //   text: 'Argument/Persuasive Essay',
      //   value: 'Argument/Persuasive Essay',
      // },
      // {
      //   text: 'Informative',
      //   value: 'Informative',
      // },
    ];

    return (
      <Layout>
        <Content>
          <Header>
            <Title>New Project</Title>
          </Header>
          <Body>
            <Section>
              <Label>Name:</Label>
              <Input
                autoFocus={true}
                value={this.state.name}
                onChange={e => this.setKey('name', e.target.value)}
              />
            </Section>
            <Section>
              <Label>Type:</Label>
              <Dropdown
                value={this.state.type}
                items={types}
                onClick={(type) => this.setKey('type', type.value)}
              />

            </Section>
            <Section>
              <Label>Color:</Label>
              <SelectColor
                value={this.state.color}
                onChange={value => this.setKey('color', value)}
              />
            </Section>
            <Section>
              <Label>Summary:</Label>
              <Summary
                value={this.state.summary}
                onChange={e => this.setKey('summary', e.target.value)}
              ></Summary>
            </Section>
            {this.state.errorMsg && <Error margin="10px 0" align="left">{this.state.errorMsg}</Error>}
           <Flex>
              <Button
                invert
                width="85px"
                height="30px"
                weight="600"
                size="1.6rem"
                onClick={() => this.createProject()}
              >
                START
            </Button>
              <Link to="/dashboard/projects">
                <Button
                  width="85px"
                  height="30px"
                  weight="600"
                  size="1.6rem"
                >
                  CANCEL
                </Button>
              </Link>
           </Flex>
            
          </Body>
        </Content>
      </Layout>
    );
  }
}
