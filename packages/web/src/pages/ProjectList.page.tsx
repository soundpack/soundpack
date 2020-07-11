import React from 'react';
import styled from 'styled-components';
import { useQuery } from "@apollo/react-hooks";
import { useSelector, useDispatch } from "react-redux";
import { SoundpackState } from "../redux/store";
import * as AppActions from "../redux/actions/app.actions";
import { Link } from 'react-router-dom';
import { PageHeader, PageTitle } from '../components/PageHeader';
import Button, { ButtonTypes } from '../elements/Button';
import { Colors } from '../styles/Colors';
import { ModalTypes } from '../components/modal/Modal';
import gql from 'graphql-tag';


const file = gql`
  query File {
    file {
      results {
        alternatives {
          transcript
          confidence
          words {
            startTime {
              seconds 
              nanos
            }
            endTime {
              seconds
              nanos
            }
            word
          }
        }
      }
    }
  }
`;

const Container = styled.div`
  background-color: ${Colors.WhiteSmoke};
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
    /* State */
  const appState = useSelector((state: SoundpackState) => state.app);
  // const { projectId, projectsCache } = appState;
  // const project = projectsCache[projectId];

  /* Actions */
  const dispatch = useDispatch();

  const createProject = () =>
    dispatch(AppActions.pushModal(ModalTypes.CreateProject));

  const { data, loading, error } = useQuery(file);


  console.log(data);

  // const saveProject = () => {
  //   dispatch(ProjectActions.CreateProjectRequest());
  //   popModal();
  // }

  /* GraphQL */
  // const { data, loading, error } = useQuery(LIST_EVENTS);

  // let events = [];


  // if(data) events = data.events;

  return (
    <Container>
      <PageHeader>
        <PageTitle>Projects</PageTitle>
        <Button
          type={ButtonTypes.Submit}
          onClick={() => createProject()}
          text="Create Project"
          width="180px"
        />
      </PageHeader>
    </Container>
  );
};
