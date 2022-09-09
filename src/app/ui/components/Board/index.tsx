// import React from 'react';
// import { DataBoardPoint } from '../../../domain/models/Board';
// import Cell from '../BoardCell';
// import {
//   Table,
//   BoardGameContainer,
//   TableRow,
//   TableHead,
//   BoardTitle,
// } from './style';

// type BoardGameProps = {
//   variant: 'player' | 'opponent';
//   points: DataBoardPoint[];
// };

// const Board: React.FC<BoardGameProps> = ({
//   variant,
//   points,
// }: BoardGameProps) => {
//   const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
//   const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

//   return (
//     <BoardGameContainer>
//       <BoardTitle variant={variant}>
//         {variant === 'player' ? `Player's Board Game` : `Ennemy's Board Game`}
//       </BoardTitle>
//       <Table variant={variant}>
//         <thead>
//           <TableRow>
//             <TableHead></TableHead>
//             {numbers.map((number) => {
//               return <TableHead key={number}>{number}</TableHead>;
//             })}
//           </TableRow>
//         </thead>
//         <tbody>
//           {alphabet.map((letter, letterIndex) => {
//             return (
//               <TableRow key={`${letter}${letterIndex}`}>
//                 <TableHead>{letter}</TableHead>
//                 {numbers.map((number, numberIndex) => {
//                   const point: DataBoardPoint = points.find(
//                     (point) =>
//                       point.x === numberIndex + 1 && point.y === letterIndex + 1
//                   ) as DataBoardPoint;
//                   return <Cell variant={variant} point={point} />;
//                 })}
//               </TableRow>
//             );
//           })}
//         </tbody>
//       </Table>
//     </BoardGameContainer>
//   );
// };

// export default Board;

import { EAppStep } from '../../../domain/models/Game';
import { IPoint } from '../../../domain/models/Point';
import { Table } from './style';

import './Board.styles.css'

export enum EPointStatus {
  Hit = 'Hit',
  Miss = 'Miss',
  Ship = 'Ship',
  Empty = 'Empty',
  Sunk = 'Sunk',
}

export type Location = {
  x: number;
  y: number;
};

interface BoardProps {
  variant: 'player' | 'opponent';
  ocean: IPoint[][] | null;
  step: EAppStep;
  onPlaceShip(location: Location): void;
  onGuess(location: Location): void;
}

const Board: React.FC<BoardProps> = ({
  variant,
  ocean,
  step,
  onPlaceShip,
  onGuess,
}: BoardProps) => {
  const handlePointClick = (point: IPoint): void => {
    if (step === EAppStep.Placing) onPlaceShip(point.location);
    if (
      step === EAppStep.Guessing &&
      (point.status === EPointStatus.Empty ||
        point.status === EPointStatus.Ship)
    )
      onGuess(point.location);
  };

  return (
    ocean && (
      <div className={`${variant}-board`}>
        <Table variant={variant}>
          <thead></thead>
          <tbody>
            {ocean.map((row: IPoint[], idx: number) => {
              return (
                <tr key={`row-${idx + 1}`}>
                  {row.map((point: IPoint) => {
                    return (
                      <td
                        className="board__square"
                        key={`square-${point.location.x}-${point.location.y}`}
                        onClick={() => handlePointClick(point)}
                        data-status={point.status}
                      ></td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    )
  );
};

export default Board;
