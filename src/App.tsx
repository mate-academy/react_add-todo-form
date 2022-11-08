import React, { useEffect, useState } from 'react';
import './App.scss';
import { GoodsList } from './components/GoodsList';
import { AddGoodForm } from './components/AddGoodForm';
import {
  addGood, deleteGood, editGoodColor, getGoods,
} from './api/goods';
import { Good } from './types/Good';
import { getColorById } from './utils/getColorById';
import { Color } from './types/Color';
import { EditGoodForm } from './components/EditGoodForm';

const colorsFromServer: Color[] = [
  { id: 1, name: 'red' },
  { id: 2, name: 'green' },
  { id: 3, name: 'blue' },
];

export const App: React.FC = () => {
  const [goods, setGoods] = useState<Good[]>([]);
  const [colors, setColors] = useState<Color[]>([]);
  const [selectedGoodId, setSelectedGoodId] = useState(0);

  const getAllColors = async () => {
    try {
      setColors(colorsFromServer);
    } catch (error: any) {
      // eslint-disable-next-line no-console
      console.log(error.message);
    }
  };

  const getAllGoods = async () => {
    try {
      const goodsFromServer = await getGoods();

      setGoods(goodsFromServer);
    } catch (error: any) {
      // eslint-disable-next-line no-console
      console.log(error.message);
    }
  };

  const addNewGood = async (name: string, colorId: number) => {
    const color = getColorById(colorId, colors);

    await addGood(name, color?.name || null);
    await getAllGoods();
  };

  const removeGood = async (id: number) => {
    await deleteGood(id);
    await getAllGoods();
  };

  const editGood = async (id: number, color: string) => {
    try {
      await editGoodColor(id, color);
      await getAllGoods();
      setSelectedGoodId(0);
    } catch (error: any) {
      // eslint-disable-next-line no-console
      console.log(error.message);
    }
  };

  const selectGood = (id: number) => {
    setSelectedGoodId(id);
  };

  useEffect(() => {
    getAllColors();
    getAllGoods();
  }, []);

  return (
    <div className="App">
      <GoodsList
        goods={goods}
        removeGood={removeGood}
        selectGood={selectGood}
      />

      <AddGoodForm addNewGood={addNewGood} colors={colors} />

      {selectedGoodId !== 0 && (
        <EditGoodForm
          goodId={selectedGoodId}
          colors={colors}
          editGood={editGood}
        />
      )}
    </div>
  );
};
