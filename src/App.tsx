/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react';
import './App.scss';
import { Form } from './Form';
import { List } from './List';
import { goods as goodsFromApi } from './api';
import { Good } from './types';
import { getColorById } from './utils';

export const App = () => {
  const goodsWithColors = goodsFromApi.map(good => ({
    ...good,
    color: getColorById(good.colorId),
  }));

  const [goods, setGoods] = useState(goodsWithColors);

  const handleSubmit = (newGood: Good) => {
    setGoods(prevGoods => [...prevGoods, newGood]);
  };

  return (
    <div className="App">
      <Form onSubmit={handleSubmit} />

      <List goods={goods} />
    </div>
  );
};
