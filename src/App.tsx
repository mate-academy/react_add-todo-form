import React, { useEffect, useState } from 'react';
import './App.scss';
import { Good } from './types/Good';
import {
  addGood, deleteGood, editGoodColor, getGoods,
} from './api/goods';
import { Color } from './types/Color';
import { GoodsList } from './components/GoodsList';
import { AddGoodForm } from './components/AddGoodForm';
import { EditGoodForm } from './components/EditGoodForm';

const colorsFromServer: Color[] = [
  { id: 1, name: 'red' },
  { id: 2, name: 'green' },
  { id: 3, name: 'blue' },
];

const getColorById = (colorId: number, colors: Color[]) => {
  const foundColor = colors.find(color => color.id === colorId);

  return foundColor || null;
};

export const App: React.FC = () => {
  const [goods, setGoods] = useState<Good[]>([]);
  const [colors, setColors] = useState<Color[]>([]);
  const [editGoodId, setEditGoodId] = useState(0);

  const handleEditGood = (goodId: number) => {
    setEditGoodId(goodId);
  };

  const getAllGoods = async () => {
    try {
      const goodsFromServer = await getGoods();

      setGoods(goodsFromServer);
    } catch (error: any) {
      // eslint-disable-next-line no-console
      console.log('error', error.message);
    }
  };

  const getAllColors = async () => {
    try {
      setColors(colorsFromServer);
    } catch (error: any) {
      // eslint-disable-next-line no-console
      console.log('error', error.message);
    }
  };

  const addNewGood = async (name: string, colorId: number) => {
    const color = getColorById(colorId, colors);

    try {
      await addGood(name, color?.name || null);
      await getAllGoods();
    } catch (error: any) {
      // eslint-disable-next-line no-console
      console.log(error.message);
    }
  };

  const handleDeleteGood = async (id: number) => {
    await deleteGood(id);
    await getAllGoods();
  };

  const editGood = async (id: number, color: string) => {
    await editGoodColor(id, color);
    await getAllGoods();
  };

  useEffect(() => {
    getAllGoods();
    getAllColors();
  }, []);

  return (
    <div className="App">
      <GoodsList
        goods={goods}
        deleteGood={handleDeleteGood}
        handleEditGood={handleEditGood}
      />

      <AddGoodForm addNewGood={addNewGood} colors={colors} />

      {editGoodId !== 0 && (
        <EditGoodForm
          goodId={editGoodId}
          colors={colors}
          editGood={editGood}
        />
      )}
    </div>
  );
};
