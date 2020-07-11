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
import LIST_PROJECTS from '../graphql/queries/projects.query';
import IProject from '@soundpack/models/.dist/interfaces/IProject';

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
              nano
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
  position: relative;
  display: flex;
  flex-direction: column;
  width: fill-available;
  /* background-color: ${Colors.WhiteSmoke}; */
  /* display: flex;
  flex-direction: row; */
`;

const Content = styled.div`
  /* padding: 0 20px; */
`;

const Event = styled.div`
  display: border-box;
  width: 320px;
  height: 195px;
  padding: 15px;
  margin-left: 20px;
  margin-top: 30px;
  border-radius: 5px;
  border: 1px solid ${Colors.Grey6};
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.1);
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

  const { data, loading, error } = useQuery(LIST_PROJECTS);

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
      <Content>
        {data?.projects.map((project: IProject) => {
          return <Event>{project.name}</Event>;
        })}
      </Content>
    </Container>
  );
};
