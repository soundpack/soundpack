import styled from "styled-components";
import { Colors } from "./../Colors";
import logoSrc from "./../../assets/images/logo.png";
import * as Polished from 'polished';

export const Container = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${Polished.rgba(Colors.DarkBlue, 0.97)};
`;

export const Row = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
  width: 100%;
`;

export const Text = styled.div`
  color: ${Colors.Grey1};
  font-size: 1.2rem;
  font-weight: 500;
`;

export const Content = styled.div`
  width: 270px;
  padding-top: 10px;
`;

export const Footer = styled.div`
  margin: 20px 0 10px;
`

// export const Logo = () => (
//   <LogoContainer>
//     <Link to="/">
//       <LogoImg src={logoSrc} />
//     </Link>
//   </LogoContainer>
// );
