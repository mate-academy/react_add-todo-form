import React, { useContext, useState } from 'react';
import cn from 'classnames';
import { getColorById } from '../../helpers';
import { GoodsWithColors } from '../../types/Good';
import colorsFromServer from '../../api/colors';
import { GoodsOperationsContext } from '../GoodsProvider';

type Props = {
  good?: GoodsWithColors;
  setEditing?: (value: boolean) => void;
};

export const GoodForm: React.FC<Props> = ({
  good,
  setEditing,
}) => {
  const [name, setName] = useState(good?.name ?? '');
  const [currentColorId, setCurrentColorId] = useState(good?.colorId ?? 0);
  const [hasNameError, setHasNameError] = useState(false);

  const { updateGoodsHandler, addGoodHandler } = useContext(
    GoodsOperationsContext,
  );

  const hasEmptyFields = !name || !currentColorId;

  const resetForm = () => {
    setName('');
    setCurrentColorId(0);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!name) {
      setHasNameError(true);

      return;
    }

    const goodHandler = good ? updateGoodsHandler : addGoodHandler;

    goodHandler({
      id: good?.id ?? Date.now(),
      name,
      colorId: currentColorId,
      color: getColorById(currentColorId),
    });

    setEditing?.(false);

    resetForm();
  };

  return (
    <form
      onSubmit={handleSubmit}
    >
      <input
        className={cn({
          'with-error': hasNameError,
        })}
        type="text"
        value={name}
        onChange={(event) => {
          setName(event.target.value);

          if (event.target.value) {
            setHasNameError(false);

            return;
          }

          setHasNameError(true);
        }}
      />

      <select
        value={currentColorId}
        onChange={(event) => {
          setCurrentColorId(+event.target.value);
        }}
      >
        <option value="0" disabled>Choose a color</option>
        {colorsFromServer.map(color => (
          <option
            key={color.id}
            value={color.id}
          >
            {color.name}
          </option>
        ))}
      </select>

      <button
        type="submit"
        disabled={hasEmptyFields}
      >
        Add
      </button>
    </form>
  );
};
