import React, { Component, Fragment } from 'react';
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
import Card from '../components/Card';
import DocumentTypeButtons from '../components/DocumentTypeButtons';
import debounce from 'debounce';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import CardDetails from './../components/CardDetails';

const Content = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

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
      cardId: null,
      errorMsg: null,

    };

    this.getProject();
    this.updateProjectDebounced = debounce(this.updateProject, 1000);
    this.handleResize = () => this.setState(this.state);
     window.addEventListener('resize', this.handleResize);
  }
  componentDidMount(){
    
  }
  componentWillUnmount(){
    window.removeEventListener('resize', this.handleResize);
  }

  async getProject() {
    const { query: { projectId } } = url.parse(window.location.href, true);

    try {
      const project = await client.getProject(projectId);

      await this.setState({
        name: project.name,
        type: project.type,
        color: project.color,
        summary: project.summary,
        cards: project.cards,
      });
      setTimeout(() => this.setState({}), 25);

    } catch (errorMsg) {
      this.setState({ errorMsg });
    }
  }

  async updateProject(cards) {
    const { query: { projectId } } = url.parse(window.location.href, true);
    const newProject = {
      _id: projectId,
      cards: cards || this.state.cards,
    };

    try {
      await client.updateProject(newProject);
    } catch (errorMsg) {
      this.setState({ errorMsg });
    }
  }

  selectCard(cardId) { 
    this.setState({
      cardId,
    });
  }

  updateCard(card) {
    const currentCard = this.state.cards.find(c => c._id === card._id);
    if (currentCard) {
      let newCard = {
        ...currentCard,
        ...card
      };

      const cards = this.state.cards.map((card, index) => {
        if (card._id === newCard._id) return newCard;
        else return card;

      });

      this.setState({
        cards,
      }, () => this.updateProjectDebounced());
    }
  }

  deleteCard(cardId) {
    let { cards } = this.state;
    cards = [...cards].filter(card => card._id !== cardId);
    this.setState({ cardId: null, cards }, () => {
      this.updateProject();
    })
  }

  async createCard() {
    const card = {
      value: 'Header',
      name: 'Header',
      name: 'Header',
      placeholder: 'Dates, names, addresses, etc',
      color: colors.lightblue,
      tips: [
        'Date',
        'Your Name',
        'Your Address',
        'Your City, State, Zip Code',
        'Your Phone Number',
        'Your Email Address',
        'Hiring Manager’s Name',
        'Company Name',
        'Company Address',
        'Company City, State, Zip Code',
      ]
    };

    let cards = [...this.state.cards, card];
    
    await this.updateProject(cards);
    await this.getProject();
    this.selectCard(this.state.cards[this.state.cards.length -1 ]._id);
  }

  setKey(key, value) {
    this.setState({
      [key]: value,
      errorMsg: null,
    })
  }

  cardsPerRow() {
    const CARD_WIDTH = 240;
    const container = document.getElementById('STORY_SQUARE_CONTENT')
    if(!container) return 4;
    return Math.floor(container.offsetWidth / CARD_WIDTH);
  }

  async onDragEnd(result) {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const reorder = (list, startIndex, endIndex) => {
      const result = Array.from(list);
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);

      return result;
    };

    const cards = reorder(
      this.state.cards,
      result.source.index,
      result.destination.index
    );

    await this.setState({
      cards
    });

    this.updateProject();
  }

  renderCardDetails() {
    const { cardId } = this.state;
    const card = this.state.cards.find(card => cardId === card._id);

    if(card) {
      return (
        <CardDetails 
          card={card} 
          updateCard={card => this.updateCard(card)} 
          deleteCard={cardId => this.deleteCard(cardId)}
          close={() => this.selectCard(null)}
        />
      );
    }
  }

  render() {
    const { cards } = this.state;

    if(!cards.length) return null;

    return (
      <Fragment>
        {this.renderCardDetails()}
        <Layout>
          <DragDropContext onDragEnd={result => this.onDragEnd(result)}>
            <Droppable droppableId="droppable" direction="horizontal">
            {(provided, snapshot) => {
              return (
                <Content
                  id="STORY_SQUARE_CONTENT"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {cards.map((card, index) => {
                    const cardsPerRow = this.cardsPerRow();
                    const rowCount = Math.ceil(cards.length / cardsPerRow);
                    const currentRow = Math.ceil((index + 1) / cardsPerRow);
                    const rightEnd = index === 0 ? false : (index + 1) % cardsPerRow === 0;
                    const leftEnd = index === 0 ? true : (index + 1) % cardsPerRow === 1;
                    const firstRow = index < cardsPerRow;
                    const lastRow = rowCount === currentRow;
                    const lastCard = index === cards.length - 1;
                    const isDragging = snapshot.draggingFromThisWith === card._id;

                    return (
                      <div onClick={() => this.selectCard(card._id)}>
                        <Card
                          key={index}
                          index={index}
                          card={card}
                          topLine={!isDragging}
                          bottomLine={!isDragging}
                          rightEnd={rightEnd}
                          leftEnd={leftEnd}
                          firstRow={firstRow}
                          lastRow={lastRow}
                          lastCard={lastCard}
                          updateCard={card => this.updateCard(card)}
                          
                        />
                        {provided.placeholder}
                      </div>
                    );
                  })}
                  <Button invert onClick={() => this.createCard()} width="125px" margin="20px 0 0">
                    Add Square
                  </Button>
                  <DocumentTypeButtons />
                </Content>
              );
            }}
            </Droppable>
          </DragDropContext>
        </Layout>
      </Fragment>
    );
  }
}
