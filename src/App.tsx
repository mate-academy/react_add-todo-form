import React, { useState } from 'react';

import './App.css';
import { Color, Good, GoodWithoutColor } from './react-app-env';
import { GoodsList } from './components/GoodsList';
import {GoodsForm} from "./components/GoodsForm";

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

const goodsWithColor: Good[] = goodsFromServer.map(good => ({
  ...good,
  color: getColorById(good.colorId),
}));

const App: React.FC = () => {
  const [goods, setGoods] = useState<Good[]>([...goodsWithColor]);

  const addGood = (name: string, colorId: number) => {
    const newGood = {
      id: Date.now(),
      name,
      colorId,
      color: getColorById(colorId),
    };

    setGoods((currentGoods) => [...currentGoods, newGood]);
  };

  const deleteGood = (goodId: number) => {
    setGoods((currentGoods) => (
      currentGoods.filter(good => good.id !== goodId)
    ))
  }

  const updateGood = (
    goodId: number,
    name: string,
    colorId: number,
  ) => {
    const goodsCopy = goods.map(good => {
      if (good.id === goodId) {
        return {
          ...good,
          name,
          colorId,
          color: getColorById(colorId),
        }
      }

      return good;
    });

    setGoods(goodsCopy);
  }

  return (
    <div className="App">
      <h1>Form</h1>
      <GoodsList
        goods={goods}
        colors={colors}
        deleteGood={deleteGood}
        updateGood={updateGood}
      />

      <GoodsForm
        colors={colors}
        addGood={addGood}
      />
    </div>
  );
};

export default App;
