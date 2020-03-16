import React from "react";
import styled from "styled-components";
import { Colors } from "../styles/Colors";
import Input, { InputProps } from './Input';

const Container = styled.div`
  position: relative;
  width: 100%;
`;

const Label = styled.div`
  font-size: 1.2rem;
  font-weight: 500;
  color: ${Colors.Grey2};
  margin-bottom: 5px;
`;

export type LabeledInputProps = InputProps & {label: string}

export default function LabeledInput({
  label,
  ...inputProps
}: LabeledInputProps) {
  return (
    <Container>
      <Label>{label}</Label>
      <Input {...inputProps} />
    </Container>
  );
}
