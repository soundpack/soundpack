import React, { useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { SoundpackState } from "../../redux/store";
import * as AppActions from "../../redux/actions/app.actions";
import Button, { ButtonTypes } from "../../elements/Button";
import {
  ModalContainer,
  ModalHeader,
  ModalContent,
  ModalFooter,
} from "./Modal";

const Container = styled.div`
  width: 400px;
`;

const LoaderContainer = styled.div`
  width: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Spacer = styled.div`
  height: 30px;
`;

type CreateProjectModalProps = {}

const CreateProjectModal: React.FC<CreateProjectModalProps> = () => {
  /* State */
  // const projectState = useSelector((state: SoundpackState) => state.project);
  // const { projectId, projectsCache } = projectState;
  // const project = projectsCache[projectId];

  /* Actions */
  const dispatch = useDispatch();

  const popModal = () => dispatch(AppActions.popModal());

  // const saveProject = () => {
  //   dispatch(ProjectActions.CreateProjectRequest());
  //   popModal();
  // }

  /** Render */
  return (
    <ModalContainer>
      <ModalHeader title="Create Project" close={popModal} />
      <ModalContent>
        <Container>
          <Spacer />
          {/* {errorMsg && <Error margin="10px 0px 0px 0px">{errorMsg}</Error>} */}
        </Container>
      </ModalContent>
      <ModalFooter>
        <div />
        <Button
          type={ButtonTypes.Submit}
          onClick={() => console.log()}
          text="Create Project"
          width="180px"
        />
      </ModalFooter>
    </ModalContainer>
  );
};

export default CreateProjectModal;
