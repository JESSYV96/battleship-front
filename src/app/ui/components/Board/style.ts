import styled, { css } from 'styled-components';

type Props = {
  variant: 'player' | 'opponent';
};

export const BoardGameContainer = styled.div``;

export const BoardTitle = styled.h2<Props>`
  margin: 0;
  text-align: center;
  border-top: 4px solid
    ${({ variant }) => (variant === 'player' ? 'green' : 'red')};
  border-left: 4px solid
    ${({ variant }) => (variant === 'player' ? 'green' : 'red')};
  border-right: 4px solid
    ${({ variant }) => (variant === 'player' ? 'green' : 'red')};
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  color: ${({ variant }) => (variant === 'player' ? 'green' : 'red')};
`;

export const Table = styled.table<Props>`
  border-collapse: collapse;
  background-color: black;
  border: 4px solid ${({ variant }) => (variant === 'player' ? 'green' : 'red')};
  th,
  td {
    width: 40px;
    height: 40px;
    border: 1px solid
      ${({ variant }) => (variant === 'player' ? 'green' : 'red')};
  }
`;

export const TableHead = styled.th`
  text-transform: uppercase;
  font-weight: bold;
  color: white;
  width: 40px;
  height: 40px;
`;

export const TableRow = styled.tr``;
