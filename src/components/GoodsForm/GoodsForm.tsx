import React, { useState } from "react";
import classnames from "classnames";
import { Color } from "../../react-app-env";

interface Props {
  colors: Color[];
  addGood: (name: string, colorId: number) => void;
}

export const GoodsForm: React.FC<Props> = ({ colors, addGood }) => {
  const [newGoodName, setNewGoodName] = useState('');
  const [hasNameError, setHasNameError] = useState(false);

  const [selectColorId, setSelectColorId] = useState(0);
  const [hasColorIdError, setHasColorIdError] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setHasNameError(!newGoodName);
    setHasColorIdError(!selectColorId);

    if (newGoodName && selectColorId) {
      addGood(newGoodName, selectColorId);
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
