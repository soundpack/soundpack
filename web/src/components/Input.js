import React, { Component } from 'react';
import styled from 'styled-components';
import colors from './../styles/colors';
import { Input } from 'semantic-ui-react';

const InputStyle = styled.div`
background-color: transparent;
  .ui.input {
    margin-bottom: 20px;
    background-color: transparent;
  }

  .input {
    > input {
      height: 40px;
      box-shadow: 0px;
      border: 0px;
      border-bottom: 2px solid ${colors.white};
      background-color: transparent;
      outline: 0px;
      border-radius: 0px;
      padding-left: 0px;
      color: ${colors.white};
      font-weight: 500;
      font-size: 1.6rem;

      &:active {
        background-color: transparent;
        border: 0px;
        border-bottom: 2px solid ${colors.white};
        color: ${colors.white};
        ::-webkit-input-placeholder { /* Chrome/Opera/Safari */
          color: #a9a9a9;
        }
        ::-moz-placeholder { /* Firefox 19+ */
          color: #a9a9a9;
        }
        :-ms-input-placeholder { /* IE 10+ */
          color: #a9a9a9;
        }
        :-moz-placeholder { /* Firefox 18- */
          color: #a9a9a9;
        }
      }

      &:focus {
        background-color: transparent;
        border: 0px;
        border-bottom: 2px solid ${colors.white};
        color: ${colors.white};
        ::-webkit-input-placeholder { /* Chrome/Opera/Safari */
          color: #a9a9a9;
        }
        ::-moz-placeholder { /* Firefox 19+ */
          color: #a9a9a9;
        }
        :-ms-input-placeholder { /* IE 10+ */
          color: #a9a9a9;
        }
        :-moz-placeholder { /* Firefox 18- */
          color: #a9a9a9;
        }
      }
    }
  }
`;

export default function ({ ...props }) {
  return (
    <InputStyle {...props}>
      <Input {...props} />
    </InputStyle>
  );
}
