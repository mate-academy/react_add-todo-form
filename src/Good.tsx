import { FC } from 'react';
import { Good as GoodType } from './types';

interface Props {
  good: GoodType;
}

export const Good: FC<Props> = ({ good }) => {
  return (
    <article className="card">
      <p className="card__title" style={{ color: good.color?.name || 'black' }}>
        {good.name}
      </p>
    </article>
  );
};
