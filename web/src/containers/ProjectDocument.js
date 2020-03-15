import React, { Component } from 'react';
import styled from 'styled-components';
import colors from '../styles/colors';
import { Error } from '../styles/App';
import { Link } from 'react-router-dom';
import Layout from './Layout'
import Button from '../components/Button';
import SelectColor from '../components/SelectColor';
import Dropdown from '../components/Dropdown';
import client from '../util/client';
import url from 'url';
import DocumentCard from '../components/DocumentCard';
import DocumentTypeButtons from '../components/DocumentTypeButtons';
import debounce from 'debounce';


const Content = styled.div`
  margin-left: 10%;
  padding-bottom: 60px;
`;

export default class ProjectDetails extends Component {
  constructor(params) {
    super(params);
    this.state = {
      name: '',
      type: 'Essay',
      color: colors.red,
      summary: '',
      cards: [],
      errorMsg: null,
    };
    
    this.getProject();
    this.updateProjectDebounced = debounce(this.updateProject, 1000);
    this.handleResize = () => this.setState(this.state);
     window.addEventListener('resize', this.handleResize);
  }
  componentWillUnmount(){
    window.removeEventListener('resize', this.handleResize);
  }

  async getProject() {
    const { query: { projectId } } = url.parse(window.location.href, true);

    try {
      const project = await client.getProject(projectId);

      return await this.setState({
        name: project.name,
        type: project.type,
        color: project.color,
        summary: project.summary,
        cards: project.cards,
      });

    } catch (errorMsg) {
      this.setState({ errorMsg });
    }
  }

  async updateProject() {
    const { query: { projectId } } = url.parse(window.location.href, true);
    const newProject = {
      _id: projectId,
      cards: this.state.cards,
    };

    try {
      await client.updateProject(newProject);
    } catch (errorMsg) {
      this.setState({ errorMsg });
    }
  }

  updateCard(card) {
    const currentCard = this.state.cards.find(c => c._id === card._id);
    if(currentCard) {
      let newCard = {
        ...currentCard,
        ...card
      };

      const cards = this.state.cards.map((card, index) => {
        if(card._id === newCard._id) return newCard;
        else return card;
        
      });

      this.setState({
        cards,
      }, () => this.updateProjectDebounced());
    }
  }

  setKey(key, value) {
    this.setState({
      [key]: value,
      errorMsg: null,
    })
  }

  render() {
    return (
      <Layout>
        <Content>
          {this.state.cards.map((card, index) => {
            return (
              <DocumentCard 
                key={card._id} 
                card={card}
                updateCard={card => this.updateCard(card)}
              />
            );
          })}
          <DocumentTypeButtons />
        </Content>
      </Layout>
    );
  }
}


