import { EAppStep } from '../../../domain/enums/AppStep';
import { EPointStatus } from '../../../domain/enums/PointStatus';
import { IPoint } from '../../../domain/models/Point';
import { Coordinate } from '../../../domain/valueObjects/Coordinate';
import { Table } from './style';

interface BoardProps {
  variant: 'player' | 'opponent';
  ocean: IPoint[][] | null;
  step: EAppStep;
  onPlaceShip(location: Coordinate): void;
  onGuess(location: Coordinate): void;
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
