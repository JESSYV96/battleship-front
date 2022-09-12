import styled, { css } from 'styled-components';
import { EPointStatus } from '../../../domain/enums/PointStatus';
import { EAppStep } from '../../../domain/enums/AppStep';
// import './Board.styles.css';

type TableProps = {
  variant: 'player' | 'opponent';
  step: EAppStep;
};

type TableDataProps = {
  variant: 'player' | 'opponent';
  status?: EPointStatus;
};

const playerBoard = () => css`
  .cell {
    opacity: 0.7;
    border: 1px solid #aaa;
    &[data-status='Empty'] {
      opacity: 0.4;
    }
  }
  opacity: 0.7;
  border: 1px solid #aaa;
`;

const opponentBoard = () => css`
  .cell {
    opacity: 0;
    border: 1px solid #555;
    &[data-status='Miss'] {
      opacity: 0.8;
      background: #848482;
    }
    &[data-status='Hit'] {
      opacity: 0.8;
      background: #e3a702;
    }
    &[data-status='Sunk'] {
      opacity: 0.8;
      background: #d41f1f;
    }
  }
  border: 1px solid #555;
`;

const hit = () => css`
  background: #e3a702;
`;

const miss = () => css`
  background: #848482;
`;

const ship = () => css`
  background: #184a67;
`;

const empty = () => css`
  background: #61bdf3;
`;

const sunk = () => css`
  background: #d41f1f;
`;

export const BoardGameContainer = styled.div``;

export const BoardTitle = styled.h2<TableProps>`
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

export const Table = styled.table<TableProps>`
  border-collapse: collapse;
  border: 4px solid ${({ variant }) => (variant === 'player' ? 'green' : 'red')};
  ${(props) => props.variant === 'player' && playerBoard()}
  ${(props) => props.variant === 'opponent' && opponentBoard()}
  ${(props) =>
    props.step === EAppStep.Guessing &&
    css`
      .cell {
        &[data-status='Ship'] {
          background: #61bdf3;
        }
      }
    `}
`;

export const TableHead = styled.th`
  text-transform: uppercase;
  font-weight: bold;
  color: white;
`;

export const TableData = styled.td<TableDataProps>`
  background: #ccc;
  padding: 5px;
  text-align: center;
  font-size: 0.8rem;
  width: 40px;
  height: 40px;

  ${(props) => props.status === EPointStatus.Hit && hit()}
  ${(props) => props.status === EPointStatus.Miss && miss()}
  ${(props) => props.status === EPointStatus.Ship && ship()}
  ${(props) => props.status === EPointStatus.Empty && empty()}
  ${(props) => props.status === EPointStatus.Sunk && sunk()}
`;

export const TableRow = styled.tr``;
