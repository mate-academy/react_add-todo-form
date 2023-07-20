import { Good } from './types';

type Porps = {
  goods: Good[];
};

export const GoodList: React.FC<Porps> = ({ goods }) => (
  <ul>
    {goods.map(good => (
      <li
        key={good.id}
        style={{ color: good.color?.name || 'black' }}
      >
        {good.name}
        {good.id}
      </li>
    ))}
  </ul>
);
