import React from 'react';
import { GoodWithColor } from '../../types/GoodWithColor';

interface Props {
  goods: GoodWithColor[]
  removeGood: (goodId: number) => void;
}

export const GoodsList: React.FC<Props> = ({
  goods,
  removeGood,
}) => {
  const DEFAULT_COLOR = 'black';

  return (
    <ul>
      {goods.map(({ id, name, color }) => (
        <React.Fragment key={id}>
          <li
            style={{ color: color?.name || DEFAULT_COLOR }}
          >
            {name}
          </li>
          <button
            type="button"
            onClick={() => {
              removeGood(id);
            }}
          >
            X
          </button>
        </React.Fragment>
      ))}
    </ul>
  );
};
