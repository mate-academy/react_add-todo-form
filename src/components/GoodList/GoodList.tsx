/* eslint-disable react/display-name */
/* eslint-disable no-console */
/* eslint-disable prettier/prettier */
import React from 'react';
import { Good } from '../../types/Good';
import { GoodItem } from '../GoodItem';

type Props = {
  goods: Good[];
};

export const GoodList: React.FC<Props> = React.memo(
  ({
    goods,
  }) => {
    console.log('GoodList is rendering ');
  
    return (
      <div className="GoodList">
        {goods.map(good => (
          <GoodItem key={good.id} good={good} />
        ))}
      </div>
    );
  },
  // propsAreEqual
  (prevProps, nextProps) => {
    return prevProps.goods === nextProps.goods;
  }
);
