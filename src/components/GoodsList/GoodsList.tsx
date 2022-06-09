import React, {useState} from 'react';
import {Color, Good} from '../../react-app-env';
import { EditGoodForm } from '../EditGoodForm';

interface Props {
  goods: Good[]
  deleteGood: (goodId: number) => void
  updateGood: (
    goodId: number,
    name: string,
    colorId: number,
  ) => void,
  colors: Color[],
}

export const GoodsList: React.FC<Props> = ({
  goods,
  deleteGood,
  updateGood,
  colors,
}) => {
  const [selectedGoodId, setSelectedGoodId] = useState(0);

  return (
    <ul>
      {goods.map(good => (
        <React.Fragment key={good.id}>
          <li
            style={{ color: good.color?.name }}
          >
            {good.name}

            <button
              type="button"
              onClick={() => {
                setSelectedGoodId(good.id);
              }}
            >
              Edit
            </button>

            <button
              type="button"
              onClick={() => {
                deleteGood(good.id)
              }}
            >
              X
            </button>
          </li>
          {selectedGoodId === good.id && (
            <EditGoodForm
              good={good}
              colors={colors}
              editGood={updateGood}
            />
          )}
        </React.Fragment>
      ))}
    </ul>
  );
}
