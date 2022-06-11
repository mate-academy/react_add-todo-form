import React, {useState} from 'react';
import classnames from 'classnames';
import './App.css';
import { Color, GoodWithoutColor, Good } from "./react-app-env";
import { GoodsList } from "./components/GoodsList";

const colors: Color[] = [
  { id: 1, name: 'red' },
  { id: 2, name: 'green' },
  { id: 3, name: 'blue' },
];

const goodsFromServer: GoodWithoutColor[] = [
  { id: 1, colorId: 1, name: 'Dumplings' },
  { id: 2, colorId: 2, name: 'Carrot' },
  { id: 3, colorId: 3, name: 'Eggs' },
  { id: 4, colorId: 1, name: 'Ice cream' },
  { id: 5, colorId: 2, name: 'Apple' },
  { id: 6, colorId: 3, name: 'Bread' },
  { id: 7, colorId: 1, name: 'Fish' },
  { id: 8, colorId: 2, name: 'Honey' },
  { id: 9, colorId: 3, name: 'Jam' },
  { id: 10, colorId: 1, name: 'Garlic' },
];


const getColorById = (colorId: number): Color | null => {
  return colors.find(color => color.id === colorId) || null;
};

const goodsWithColors: Good[] = goodsFromServer.map(good => ({
  ...good,
  color: getColorById(good.colorId),
}));

const App: React.FC = () => {
  const [newGoodName, setNewGoodName] = useState('');
  const [hasNameError, setNameError] = useState(false);

  const [selectedColorId, setSelectedColorId] = useState(0);
  const [hasColorIdError, setColorIdError] = useState(false);

  const [goods, setGoods] = useState<Good[]>(goodsWithColors);

  const addGood = (name: string, colorId: number) => {
    const newGood = {
      id: Date.now(),
      name,
      colorId,
      color: getColorById(colorId),
    };

    setGoods((currentGood) => [...currentGood, newGood]);
  };

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setNameError(!newGoodName);
    setColorIdError(!selectedColorId);

    if (newGoodName && selectedColorId) {
      addGood(newGoodName, selectedColorId);
      setNewGoodName('');
      setSelectedColorId(0);
    }
  };

  return (
    <div className="App">
      <GoodsList goods={goods} />

      <form onSubmit={handleFormSubmit}>
        <input
          className={classnames({ error: hasNameError })}
          type="text"
          value={newGoodName}
          onChange={(event) => {
            setNewGoodName(event.target.value);
            setNameError(false);
          }}
        />

        {hasNameError && (
          <span className="error">Name is empty</span>
        )}

        <select
          className={classnames({ error: hasColorIdError })}
          value={selectedColorId}
          onChange={(event) => {
            setSelectedColorId(+event.target.value);
            setColorIdError(false);
          }}
        >
          <option value="0" disabled>Choose a color</option>

          {colors.map((color) => (
            <option key={color.id} value={color.id}>
              {color.name}
            </option>
          ))}
        </select>

        {hasColorIdError && (
          <span className="error">Color is empty</span>
        )}

        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default App;
