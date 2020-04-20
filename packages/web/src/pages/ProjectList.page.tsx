import React from 'react';
import styled from 'styled-components';
import { useQuery } from "@apollo/react-hooks";
import { Link } from 'react-router-dom';

const Container = styled.div`
  background-color: whitesmoke;
  display: flex;
  flex-direction: row;
`;

const Event = styled.div`
  width: 200px;
  height: 300px;
  margin-right: 20px;
  border: 1px solid grey;
  border-radius: 5px;
`;

export default function EventList({match}: any) {

  // const { data, loading, error } = useQuery(LIST_EVENTS);

  // let events = [];


  // if(data) events = data.events;

  return (
    <Container>
    
    </Container>
  );
};
