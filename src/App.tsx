import './App.scss';
import { useState } from 'react';
import goodsFromServer from './api/goods';
import colorsFromServer from './api/colors';
import { GoodWithColor } from './types';
import { GoodsList } from './components/GoodsList';
import { AddGoodForm } from './components/AddGoodForm';

const preparedGoods: GoodWithColor[] = goodsFromServer.map(good => ({
  ...good,
  color: colorsFromServer.find(({ id }) => id === good.colorId) || null,
}));

export const App = () => {
  const [goods, setGoods] = useState<GoodWithColor[]>(preparedGoods);

  const addGoodHandler = (newGood: Omit<GoodWithColor, 'id'>) => {
    const goodIds = goods.map(({ id }) => id);
    const maxGoodId = Math.max(...goodIds);

    const preparedGood = {
      ...newGood,
      id: maxGoodId + 1,
    };

    setGoods((prevState) => [...prevState, preparedGood]);
  };

  const deleteGoodHandler = (goodId: number) => {
    setGoods((prevState) => (
      prevState.filter(good => good.id !== goodId)
    ));
  };

  return (
    <div className="App">
      <h1>Add good form</h1>

      <AddGoodForm
        addGoodHandler={addGoodHandler}
      />

      <GoodsList
        goods={goods}
        deleteGoodHandler={deleteGoodHandler}
      />
    </div>
  );
};
