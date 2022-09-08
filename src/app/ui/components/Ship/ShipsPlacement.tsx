import { ShipData } from '../../../domain/models/Ships';
import './Ship.styles.css';

interface ShipsPlacementProps {
  ships: ShipData[];
  activeShipToPlace: ShipData | null;
  onShipClick(ship: ShipData): void;
  onChangeOrientation(ship: ShipData): void;
}

const ShipsPlacement: React.FC<ShipsPlacementProps> = ({
  ships,
  activeShipToPlace,
  onShipClick,
  onChangeOrientation,
}: ShipsPlacementProps) => {
  return (
    <div className="ships-group">
      {ships.map((s) => (
        <div
          key={s.name}
          className={s === activeShipToPlace ? 'ship active-placing' : 'ship'}
          data-shipblocks={s.name}
        >
          <p className="ship-header">
            {s.name}
            <button onClick={() => onChangeOrientation(s)}>
              {/* <FontAwesomeIcon icon={faRedo} /> */}Change orientation
            </button>
          </p>
          <div
            className={`ship-blocks ${s.orientation}`}
            onClick={() => onShipClick(s)}
          >
            <div>
              {Array(s.size)
                .fill(0)
                .map((_, idx) => (
                  <span key={idx} />
                ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ShipsPlacement;
