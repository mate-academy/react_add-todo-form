import React, { useContext, useState } from 'react';
import { Good } from '../../react-app-env';
import { EditGoodForm } from '../EditGoodForm';
import { colors } from '../../api/colors';
import { GoodsContext } from '../../GoodsContextProvider';

interface Props {
  goods: Good[]
}

export const GoodsList: React.FC<Props> = React.memo(({
  goods,
}) => {
  const [selectedGoodId, setSelectedGoodId] = useState(0);

  const resetSelectedGoodId = () => {
    setSelectedGoodId(0);
  };

  const { deleteGood, updateGood } = useContext(GoodsContext);

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
                deleteGood(good.id);
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
              resetSelectedGoodId={resetSelectedGoodId}
            />
          )}
        </React.Fragment>
      ))}
    </ul>
  );
});
