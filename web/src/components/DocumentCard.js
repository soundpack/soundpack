import React, { Component } from 'react';
import styled from 'styled-components';
import colors from '../styles/colors';
import client from '../util/client';
import Card from './Card';
import CardTip from './CardTip';
import ContentEditable from 'react-contenteditable';

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  width: 750px;
`;

const Line = styled.div`
  width: 2px;
  background-color: ${colors.grey4};
  position: absolute;
  margin: 0 15px 0 0;
  height: 100%;
  left: 235px;
`;


const Editable = styled(ContentEditable)`
  position: relative;
  background-color: ${colors.white};
  width: 500px;
  min-height: 200px;
  height: 100%;
  padding: 15px 15px 0;
  border: 0px;
  outline: 0px;
  box-shadow: 0px;
  -moz-appearance: textfield-multiline;
  -webkit-appearance: textarea;
`;

const getTextAreaId = _id => `TEXT_AREA_${_id}`;

export default class DocumentCard extends Component {
  constructor(params) {
    super(params);
    this.state = {
      focus: false,
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
  setFocus(focus) {
    this.setState({ focus });
  }

  getTextAreaHeight(_id) {
    const textarea = document.getElementById(getTextAreaId(_id));
    if(!textarea) return null;
    console.log(textarea.scrollHeight);
    return `${textarea.scrollHeight}px`;
  }

  render() {
    const { _id, name, color, placeholder, text } = this.props.card;
    return (
      <Container>
        <Card 
          card={this.props.card}
          updateCard={card => this.props.updateCard(card)} 
          isDraggable={false} 
        />
        <Line />
        <Editable 
          contentEditable 
          html={text}
          onChange={(e) => this.props.updateCard({ _id, text: e.target.value })}
          onFocus={() => this.setFocus(true)}
          onBlur={() => this.setFocus(false)}
        >
        </Editable>
      </Container>
    );
  }
}
