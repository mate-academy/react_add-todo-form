import { Good } from '../types/good';

type Props = {
  goods: Good[];
};

export const GoodsList = ({ goods }: Props) => (
  <div className="GoodList">
    {goods.map(good => (
      <article key={good.id} className="GoodCard">
        <p
          className="GoodCard__title"
          style={{ color: good.color?.name || 'black' }}
        >
          {good.name}
        </p>
      </article>
    ))}
  </div>
);
