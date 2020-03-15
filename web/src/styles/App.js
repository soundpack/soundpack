import styled from 'styled-components';
import colors from './colors';

export const AppContainer = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
`;

export const Page = styled.div`
  position: relative;
  margin: 0 auto;
  height: 100%;
  display: flex;
`;

export const H1 = styled.h1`
  font-size: 2rem;
`;

export const Section = styled.div`
  margin-bottom: 1rem;
`;

export const Flex = styled.div`
  display: flex;
  flex-direction: ${props => props.direction};
  justify-content: ${props => props.justify};
  align-items: ${props => props.align};
  width: ${props => props.width};
  flex: ${props => props.flex};
  margin: ${props => props.margin};
  padding: ${props => props.padding};
  width: ${props => props.width || '100%'};
  height: ${props => props.height};
  border-right: ${props => props.borderRight};
`;

export const FlexSpace = styled.div`
  flex: 0.05;
`;


export const Error = styled.div`
  color: ${colors.red};
  font-weight: 500;
  font-size: 1.4rem;
  margin: ${props => props.margin || '3rem 0 0'};
  text-align: ${props => props.align || 'center'};
`

