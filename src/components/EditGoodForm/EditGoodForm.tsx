import React, { useState } from "react";
import classnames from "classnames";
import { Color, Good } from '../../react-app-env';

interface Props {
  good: Good;
  colors: Color[];
  editGood: (goodId: number, name: string, colorId: number) => void;
}

export const EditGoodForm: React.FC<Props> = ({
  good,
  colors,
  editGood,
}) => {
  const [newGoodName, setNewGoodName] = useState(good.name);
  const [hasNameError, setHasNameError] = useState(false);

  const [selectColorId, setSelectColorId] = useState(good.colorId);
  const [hasColorIdError, setHasColorIdError] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setHasNameError(!newGoodName);
    setHasColorIdError(!selectColorId);

    if (newGoodName && selectColorId) {
      editGood(good.id, newGoodName, selectColorId);
      setNewGoodName('');
      setSelectColorId(0);
    }
  };


  return (
    <form
      onSubmit={handleSubmit}
    >
      <input
        className={classnames({ error: hasNameError })}
        type="text"
        value={newGoodName}
        placeholder="test"
        onChange={(event) => {
          setNewGoodName(event.target.value);
          setHasNameError(false);
        }}
      />

      {hasNameError && (
        <span>Name is empty</span>
      )}

      <select
        className={classnames({ error: hasColorIdError })}
        value={selectColorId}
        onChange={(event) => {
          setSelectColorId(+event.target.value);
          setHasColorIdError(false);
        }}
      >
        <option value="0" disabled>Choose a color</option>

        {colors.map(color => (
          <option
            key={color.id}
            value={color.id}
          >
            {color.name}
          </option>
        ))}
      </select>

      {hasColorIdError && (
        <span>Color is empty</span>
      )}

      <button
        type="submit"
      >
        Add
      </button>
    </form>
  )
};
