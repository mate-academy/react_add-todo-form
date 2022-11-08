import React from 'react';
import { Good } from '../../types/Good';

interface Props {
  goods: Good[];
  removeGood: (id: number) => void;
  selectGood: (id: number) => void;
}

export const GoodsList: React.FC<Props> = ({
  goods,
  removeGood,
  selectGood,
}) => {
  const DEFAULT_COLOR = 'black';

  return (
    <ul>
      {goods.map(({ id, name, color }) => (
        <li
          key={id}
          style={{ color: color || DEFAULT_COLOR }}
        >
          <>
            <span>{name}</span>
            <button
              onClick={() => removeGood(id)}
              type="button"
            >
              X
            </button>

            <button
              onClick={() => selectGood(id)}
              type="button"
            >
              Edit
            </button>
          </>
        </li>
      ))}
    </ul>
  );
};
