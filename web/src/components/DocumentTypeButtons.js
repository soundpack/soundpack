import React, { Component } from 'react';
import styled from 'styled-components';
import colors from './../styles/colors';
import { Link, withRouter } from 'react-router-dom';
import Button from './Button';

const Container = styled.div`
  
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 30px;
  /* position: fixed;
  bottom: 30px;
  left: 0px; */
`;

const ButtonContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

function DocumentTypeButtons({ history }) {
  const cardsLink = `/dashboard/projects/cards`;
  const documentLink = `/dashboard/projects/document`;
  const { location: { pathname, search } } = history;

  return (
    <Container>
      <ButtonContainer>
        <Link to={`${cardsLink}${search}`}>
          <Button invert={pathname === cardsLink} width="100px" weight="500">SQUARES</Button>
        </Link>
        <Link to={`${documentLink}${search}`}>
          <Button invert={pathname === documentLink} width="110px" weight="500">DOCUMENT</Button>
        </Link>
      </ButtonContainer>
    </Container>
  );
}

export default withRouter(DocumentTypeButtons);
