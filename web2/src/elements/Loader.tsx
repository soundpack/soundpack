import React from "react";
import styled from "styled-components";
import { Colors } from "./../styles/Colors";

const Container = styled.div`
  position: relative;
  top: 1.5px;

  .lds-ring {
    display: inline-block;
    position: relative;
    width: 30px;
    height: 30px;
  }
  .lds-ring div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: 24px;
    height: 24px;
    margin: 3px;
    border: 2px solid #fff;
    border-radius: 50%;
    animation: lds-ring 0.8s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: #fff transparent transparent transparent;
  }
  .lds-ring div:nth-child(1) {
    animation-delay: -0.30s;
  }
  .lds-ring div:nth-child(2) {
    animation-delay: -0.2s;
  }
  .lds-ring div:nth-child(3) {
    animation-delay: -0.10s;
  }
  @keyframes lds-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export default function Loader() {
  return (
    <Container>
      <div className="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </Container>
  );
}