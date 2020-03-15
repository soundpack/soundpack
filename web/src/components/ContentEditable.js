import React from 'react';
import styled from 'styled-components';
import colors from '../styles/colors';
import ContentEditable from 'react-contenteditable';

const Editable = styled(ContentEditable)`
  position: relative;
  background-color: white;
  border-radius: 0 0 2px 2px;
  font-size: 1.4rem;
  color: ${colors.grey9};
  height: 140px;
  padding: 10px;
  border: 0px;
  outline: 0px;
  box-shadow: 0px;
  -moz-appearance: textfield-multiline;
  -webkit-appearance: textarea;
`;

export default Editable;
