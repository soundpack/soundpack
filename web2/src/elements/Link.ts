import styled from "styled-components";
import { Link } from "react-router-dom";
import { Colors } from "./../styles/Colors";
import * as Polished from 'polished';

const StyledLink = styled(Link)`
  color: ${Colors.Purple};
  font-size: 1.2rem;
  font-weight: 500;
  text-decoration: none;

  &:hover {
    color: ${Polished.lighten(0.025, Colors.Purple)};
  }

  &:active {
    color: ${Polished.darken(0.025, Colors.Purple)};
  }
`;

export default StyledLink
