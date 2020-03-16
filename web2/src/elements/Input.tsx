import React from "react";
import styled from 'styled-components';
import { Colors } from '../styles/Colors';

type StyledInputProps = {
  margin?: string;
  padding?: string;
}

const InputStyled = styled.input<StyledInputProps>`
  background-color: ${Colors.VeryLightPurple};
  color: ${Colors.Grey1};
  outline: none;
  border: 0px;
  border-radius: 5px;
  height: 35px;
  width: fill-available;
  font-size: 1.2rem;
  font-weight: 500;
  padding-left: 10px;
  margin: ${props => props.margin};
  padding: ${props => props.padding};

  ::placeholder {
    color: ${Colors.Grey4};
  }
`;

export type InputProps = {
  autoFocus?: boolean | undefined;
  placeholder?: string;
  value: string;
  defaultValue?: string;
  type?: string;
  onChange?: any;
  onBlur?: any;
  onFocus?: any;
  margin?: string;
  padding?: string;
}

export default function Input({
  autoFocus,
  placeholder,
  value,
  defaultValue,
  type = 'text',
  onChange,
  onBlur,
  onFocus,
  margin,
  padding,
}: InputProps) {
  return (
    <InputStyled
      autoFocus={autoFocus}
      placeholder={placeholder}
      value={value}
      defaultValue={defaultValue}
      type={type}
      onChange={onChange}
      onBlur={onBlur}
      onFocus={onFocus}
      margin={margin}
      padding={padding}
    />
  );
}
