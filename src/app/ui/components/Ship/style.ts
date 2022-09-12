import styled, { css } from 'styled-components';

type Props = {
  ship: string;
  orientation: 'horizontal' | 'vertical';
  active: boolean;
};

const handleShipSize = (shipName: string): string => {
  switch (shipName) {
    case 'Destroyer':
      return '50px';
    case 'Submarine':
      return '70px';
    case 'Cruiser':
      return '70px';
    case 'Battleship':
      return '90px';
    case 'Carrier':
      return '120px';
    default:
      return '120px';
  }
};

export const ShipsContainer = styled.div`
  padding: 0 15px;
`;

export const Ship = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 15px;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #ccc;
`;

export const ShipHeader = styled.p`
  font-family: 'Allerta Stencil', sans-serif;
  text-transform: uppercase;
  font-weight: bold;
`;

export const ShipButton = styled.button`
  cursor: pointer;
  font-size: 0.6rem;
  border: none;
  display: block;
  background: #333;
  color: #fff;
  border-radius: 4px;
  width: 25px;
  height: 25px;
  margin-top: 5px;
`;

export const ShipBlocks = styled.div<Props>`
  cursor: ${({ active }) => (active ? 'auto' : 'pointer')};
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${(props) => handleShipSize(props.ship)};
  height: ${(props) => handleShipSize(props.ship)};
  & span {
    display: inline-block;
    border: 1px solid black;
    background-color: #184a67;
    width: 20px;
    height: 20px;
    ${(props) =>
      props.active &&
      css`
        opacity: 0.7;
      `}
    ${(props) =>
      props.orientation === 'vertical' &&
      css`
        display: block;
      `}
  }
`;
