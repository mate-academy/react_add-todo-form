import React from 'react';
import { Good } from '../../types/Good';

interface Props {
  goods: Good[];
  deleteGood: (id: number) => Promise<void>;
  handleEditGood: (id: number) => void;
}

export const GoodsList: React.FC<Props> = ({
  goods,
  deleteGood,
  handleEditGood,
}) => {
  const DEFAULT_COLOR = 'black';

  return (
    <ul>
      {goods.map(({ id, name, color }) => (
        <li
          key={id}
          style={{ color: color || DEFAULT_COLOR }}
        >
          {name}
          <button
            type="button"
            onClick={() => deleteGood(id)}
          >
            X
          </button>
          <button
            type="button"
            onClick={() => handleEditGood(id)}
          >
            Edit
          </button>
        </li>
      ))}
    </ul>
  );
};
