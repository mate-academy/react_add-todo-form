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

  const handleAdd = (newGood: Good) => {
    setGoods(prevGoods => [...prevGoods, newGood]);
  };

  const handleDelete = (id: number) => {
    setGoods(prevGoods => prevGoods.filter(good => good.id !== id));
  };

  const handleEdit = (name: string, id: number) => {
    setGoods(prevGoods =>
      prevGoods.map(good => {
        if (good.id === id) {
          return {
            ...good,
            name,
          };
        }

        return good;
      }),
    );
  };

  return (
    <div className="App">
      <Form onSubmit={handleAdd} />

      <List goods={goods} onDelete={handleDelete} onEdit={handleEdit} />
    </div>
  );
};
