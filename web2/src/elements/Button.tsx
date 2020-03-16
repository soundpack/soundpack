import React, { Fragment } from "react";
import styled from "styled-components";
import { Colors } from "../styles/Colors";
import * as Polished from 'polished';
// import Icon from "./Icon";

export enum ButtonTypes {
  Submit = "Submit",
  Warning = "Warning"
};

type StyledButtonProps = {
  type: string;
  onClick: any;
  margin?: string;
  padding?: string;
}

const StyledButton = styled.div<StyledButtonProps>`
  position: relative;
  height: 40px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  text-align: center;
  background-color: ${props => {
    if (props.type === ButtonTypes.Submit) {
      return Colors.Purple;
    }

    if (props.type === ButtonTypes.Warning) {
      return Colors.Red;
    }
  }};
  border-radius: 5px;
  margin: ${(props: any) => (Boolean(props.margin) ? props.margin : "0px")};
  padding: ${(props: any) => (Boolean(props.padding) ? props.padding : "0px")};
  transition: all 0.2s;

  &:hover {
    cursor: pointer;
    background-color: ${props => {
      if (props.type === ButtonTypes.Submit) {
        return Polished.lighten(0.025, Colors.Purple);
      }

      if (props.type === ButtonTypes.Warning) {
        return Polished.lighten(0.025, Colors.Red);
      }
    }};
  }

  &:active {
    top: 1px;
    cursor: pointer;
    background-color: ${props => {
      if (props.type === ButtonTypes.Submit) {
        return Polished.darken(0.025, Colors.Purple);
      }

      if (props.type === ButtonTypes.Warning) {
        return Polished.darken(0.025, Colors.Red);
      }
    }};
  }
`;

type TextProps = {
  type: string;
  icon: boolean;
}

const Text = styled.span<TextProps>`
  color: ${(props: any) => {
    if (props.type === ButtonTypes.Submit) {
      return Colors.White;
    }

    if (props.type === ButtonTypes.Warning) {
      return Colors.White;
    }
  }};
  margin-left: ${(props: any) => (props.icon ? "10px" : 0)};
  font-size: 1.4rem;
  font-weight: 500;
`;

export type ButtonProps = {
  type: string;
  text: string;
  onClick?: any;
  icon?: string;
  margin?: string;
  padding?: string;
  loading?: boolean;
};

export default function Button({
  type = ButtonTypes.Submit,
  text,
  onClick = () => {},
  icon,
  margin,
  padding,
  loading = false,
}: ButtonProps) {
  return (
    <StyledButton
      type={type}
      onClick={() => onClick()}
      margin={margin}
      padding={padding}
    >
      {(() => {
        return (
          <Fragment>
            {/* {icon && (
              <Icon
                icon={icon}
                color={Colors.Palette.Orange}
                margin="0 10px 0 0"
              />
            )} */}
            <Text type={type} icon={Boolean(icon)}>
              {text}
            </Text>
          </Fragment>
        );
      })()}
    </StyledButton>
  );
}