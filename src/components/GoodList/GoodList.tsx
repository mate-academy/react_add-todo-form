/* eslint-disable react/display-name */
/* eslint-disable no-console */
/* eslint-disable prettier/prettier */
import React from 'react';
import { Good } from '../../types/Good';

type Props = {
  goods: Good[];
  onRemove?: (goodId: number) => void;
};

export const GoodList: React.FC<Props> = React.memo(
  ({
    goods,
    onRemove = () => { }
  }) => {
    console.log('Rendering GoodList ', new Date().toLocaleTimeString());
    
    // const articles = goods.map(
    //   good => React.createElement('article', { key: good.id, className: 'GoodCard' }, 'Text 123'));

    // const div = React.createElement('div', { className: 'GoodList' }, articles);

    return (
      <div className="GoodList">
        {goods.map(good => (
          <article key={good.id} className="GoodCard">
            <p
              className="GoodCard__title"
              style={{ color: good.color?.name || 'black' }}
            >
              <button type="button" onClick={() => onRemove(good.id)}>
                x
              </button>
              {good.name}
            </p>
          </article>
        ))}
      </div>
    );
  },
  // arePropsTheSame
  (prevProps, nextProps) => {
    return prevProps.goods === nextProps.goods;
  }
);
