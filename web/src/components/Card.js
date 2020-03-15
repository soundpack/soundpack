import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import colors from '../styles/colors';
import client from '../util/client';
import { TopLine, BottomLine } from './Line';
import CardTip from './CardTip';
import ContentEditable from './ContentEditable';
import { Draggable } from "react-beautiful-dnd";

const Container = styled.div`
  position: relative;
  width: 240px;
`;

const CardTop = styled.div`
  height: 37px;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
  position: relative;
  margin-top: 35px;

`;


const CardBottom = styled.div`
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  position: relative;
`;


const CardContainer = styled.div`
  position: relative;
  width: 220px;
  /* margin-bottom: 25px; */
  height: 180px;
  background-color: ${props => props.bgColor};
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: ${props => props.bgColor};
  border-radius: 2px 2px 0 0;
  height: 30px;
  padding: 0 10px;
`;

const Title = styled.div`
  border-radius: 2px;
  /* padding: 5px 10px; */
  /* background-color: rgba(255,255,255,0.8); */
  color: ${colors.white};
  font-size: 1.4rem;
  font-weight: 500;
`;

const Edit = styled.div`
  color: ${colors.white};
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



export default class Card extends Component {
  constructor(params) {
    super(params);
    this.state = {
      errorMsg: null,
      deleting: false,
    };
  }

  async deletecard() {
    try {
      await client.deletecard(this.props.card._id);
      await this.props.refetchcards();
    } catch (errorMsg) {
      this.setState({ errorMsg });
    }
  }

  renderCard(provided, snapshot) {
    const { _id, name, color, note } = this.props.card;
    const {
      index,
      topLine,
      bottomLine,
      rightEnd,
      leftEnd,
      firstRow,
      lastRow,
      lastCard,
      updateCard = () => { }
    } = this.props;

    return (
      <Fragment>
        {(() => {
          if (topLine) {
            return (
              <CardTop>
                <CardTip color={color} />
                <TopLine
                  rightEnd={rightEnd}
                  leftEnd={leftEnd}
                  firstRow={firstRow}
                  lastRow={lastRow}
                  lastCard={lastCard}
                />
              </CardTop>
            );
          }
        })()}
        <CardContainer>
          <Header bgColor={color}>
            <Title>{name}</Title>
            <Edit></Edit>
          </Header>
          <ContentEditable
            html={note || 'Use this card to take notes about this squares content (100 character max)'}
            onChange={e => updateCard({ _id, note: e.target.value || ' ' })}
          />
        </CardContainer>
        {(() => {
          if (bottomLine) {
            return (
              <CardBottom>
                <BottomLine
                  rightEnd={rightEnd}
                  leftEnd={leftEnd}
                  firstRow={firstRow}
                  lastRow={lastRow}
                  lastCard={lastCard}
                />
              </CardBottom>
            );
          }
        })()}
      </Fragment>
    );
  }

  render() {
    const { 
      index,
      isDraggable = true,
      card: { _id }
   } = this.props;

   if(!isDraggable) {
     return (
       <Container>
         {this.renderCard()}
       </Container>
     );
   }

    return (
      <Draggable key={_id} draggableId={_id} index={index}>
       {(provided, snapshot) => {
         return (
           <Container
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
           >
            {this.renderCard(provided, snapshot)}
           </Container>
         );
       }}
      </Draggable>
    );
  }
}
