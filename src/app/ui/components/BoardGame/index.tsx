import React from 'react';
import {
  Table,
  BoardGameContainer,
  TableRow,
  TableHead,
  Cell,
  BoardTitle,
} from './style';

type BoardGameProps = {
  variant: 'player' | 'opponent';
};

const BoardGame: React.FC<BoardGameProps> = ({ variant }: BoardGameProps) => {
  const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const handleCellPosition = (e: any) => {
    let parent = e.target.parentElement;
    console.log(`x:${parent.rowIndex} y: ${e.target.cellIndex}`);
  };

  return (
    <BoardGameContainer>
      <BoardTitle variant={variant}>
        {variant === 'player' ? `Player's Board Game` : `Ennemy's Board Game`}
      </BoardTitle>
      <Table variant={variant}>
        <thead>
          <TableRow>
            <TableHead></TableHead>
            {numbers.map((number) => {
              return <TableHead>{number}</TableHead>;
            })}
          </TableRow>
        </thead>
        <tbody>
          {alphabet.map((letter) => {
            return (
              <TableRow>
                <TableHead>{letter}</TableHead>
                {numbers.map((number) => {
                  return (
                    <Cell
                      id={`${letter}${number}`}
                      onClick={handleCellPosition}
                    ></Cell>
                  );
                })}
              </TableRow>
            );
          })}
        </tbody>
      </Table>
    </BoardGameContainer>
  );
};

export default BoardGame;
