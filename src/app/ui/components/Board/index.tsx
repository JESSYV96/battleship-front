import { EAppStep } from '../../../domain/enums/AppStep';
import { EPointStatus } from '../../../domain/enums/PointStatus';
import { IPoint } from '../../../domain/models/Point';
import { Coordinate } from '../../../domain/valueObjects/Coordinate';
import { Table, TableData } from './style';

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
        <Table variant={variant} step={step}>
          <tbody>
            {ocean.map((row: IPoint[], idx: number) => {
              return (
                <tr key={`row-${idx + 1}`}>
                  {row.map((point: IPoint) => {
                    return (
                      <TableData
                        className="cell"
                        key={`cell-${point.location.x}-${point.location.y}`}
                        onClick={() => handlePointClick(point)}
                        data-status={point.status}
                        variant={variant}
                        status={point.status}
                      />
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
