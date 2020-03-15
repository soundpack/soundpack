import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import colors from '../styles/colors';
import Dropdown from './Dropdown';
import Button from './Button';
import ContentEditable from './ContentEditable';

const PageContainer = styled.div`
  position: fixed;
  height: 100%;
  width: 100%;
  background-color: rgba(0,0,0,0.4);
  z-index: 100000000;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Container = styled.div`
  position: relative;
  width: 700px;
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

const Close = styled.div`
  border-radius: 2px;
  color: ${colors.white};
  font-size: 1.4rem;
  font-weight: 500;

  &:hover {
    cursor: pointer;
  }
`;

const TopContent = styled.div`
  border-bottom: 1px solid ${colors.grey4};
  padding: 15px;
  background-color: ${colors.white};
  min-height: 100px;
`;

const BottomContent = styled.div`
  padding: 15px;
  background-color: ${colors.white};
  min-height: 200px;
`;

const Footer = styled.div`
  padding: 15px;
  background-color: ${colors.white};
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0 15px;
  box-shadow: 0px -2px 20px rgba(0,0,0,0.1);
`;


export function CardTypeDropdown({ value, onChange }) {

  const types = [
    {
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
    },
    {
      value: 'Greeting',
      name: 'Greeting',
      name: 'Greeting',
      placeholder: 'The person receiving your letter',
      color: colors.orange,
      tips: [
        'You may start with “Dear” or “To,” whichever best matches your tone and personality, as well as the job for which you are applying. (Do not use “To whom it may concern.” Research for the correct name, or at least title. For example: Dear Mrs. Schuler, or Dear Department Chair.)'
      ]
    },
    {
      value: 'Introduction',
      name: 'Introduction',
      name: 'Introduction',
      placeholder: 'Who you are, hook their attention, why you are a good fit',
      color: colors.yellow,
      tips: [
        'Introduce yourself, the job you are applying for, and why you are a good fit. Use this first paragraph to hook their attention and show your excitement for the job. Why do you want this job? Why are you the right fit? How does this job align with your career goals? (5-7 sentences)'
      ]
    },
    {
      value: 'Middle Paragraph(s)',
      name: 'Middle Paragraph(s)',
      name: 'Middle Paragraph(s)',
      placeholder: 'Expand on your strengths; be specific',
      color: colors.red,
      tips: [
        'Use the middle paragraphs to expand on your strengths specific to that particular job, and why you want to work there. Be specific and targeted. For example, you may not need to talk about your excellent computer skills for a farming job. However, if the farming job requires bookkeeping, then definitely include it! Try and focus on one targeted point per paragraph. (5-7 sentences)'
      ]
    },
    {
      value: 'Closing Paragraph(s)',
      name: 'Closing Paragraph(s)',
      name: 'Closing Paragraph(s)',
      placeholder: 'Expand on your strengths; be specific',
      color: colors.pink,
      tips: [
        'Use this paragraph to thank the hiring committee or individual for their time and consideration, and to reiterate why you would be a good fit for the position and why you want the job. It is customary to end with an invitation for them to contact you with questions, or if they would like more information.',
        'Formal letters end with a closing. This is the word right before your name, such as: sincerely, regards, thank you, or respectfully. After, include your full name. If this is a paper letter leave enough space for your signature between the closing and your name.',
      ]
    },
  ];

  return (
    <Dropdown
      value={value}
      items={types}
      onClick={(value) => onChange(value)}
      width="300px"
    />
  )
}

export default function CardDetails({ 
  card, 
  updateCard = () => {},
  deleteCard = () => {},
  close = () => {}}
){ 
  const {
    _id,
    note,
    text
  } = card;

  return (
    <PageContainer>
      <Container>
        <Header bgColor={card.color}>
          <CardTypeDropdown 
            value={card.name} 
            onChange={(attrs) => updateCard({_id: card._id, ...attrs})}
          />
          <Close onClick={() => close()}>Close</Close>
        </Header>
      <TopContent>
        <ContentEditable 
          contentEditable
          html={note || 'Use this card to take notes about this squares content (100 character max)'}
          onChange={(e) => updateCard({ _id, note: e.target.value || ' ' })}
        />
      </TopContent>
      <BottomContent>
          <ContentEditable
            contentEditable
            html={card.text || 'Write here'}
            onChange={(e) => updateCard({ _id, text: e.target.value || ' ' })}
          />
      </BottomContent>
      <Footer>
        <Button 
          invert 
          height="25px" 
          size="1.2rem" 
          width="100px"
          onClick={() => deleteCard(_id)}
        >
          Delete Card
        </Button>
        <Button 
          invert 
          height="25px" 
          size="1.2rem" 
          width="100px"
          onClick={() => close()}
        >
          Save Card
        </Button>
      </Footer>
      </Container>
    </PageContainer>
  );
}
