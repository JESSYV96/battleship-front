import { ShipData } from '../../../domain/models/Ship';
import './Ship.styles.css';
import {
  Ship,
  ShipBlocks,
  ShipButton,
  ShipsContainer,
  ShipHeader,
} from './style';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRedo } from '@fortawesome/free-solid-svg-icons';

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
    <ShipsContainer>
      {ships.map((s) => (
        <Ship key={s.name} data-shipblocks={s.name}>
          <ShipHeader>{s.name}</ShipHeader>
          <ShipButton onClick={() => onChangeOrientation(s)}>
            <FontAwesomeIcon icon={faRedo} />
          </ShipButton>
          <ShipBlocks
            ship={s.name}
            orientation={s.orientation}
            active={s === activeShipToPlace}
            onClick={() => onShipClick(s)}
          >
            <div>
              {Array(s.size)
                .fill(0)
                .map((_, idx) => (
                  <span key={idx} />
                ))}
            </div>
          </ShipBlocks>
        </Ship>
      ))}
    </ShipsContainer>
  );
};

export default ShipsPlacement;
