import { GoodsWithColors } from '../../types/Good';

type Props = {
  goods: GoodsWithColors[];
};

export const GoodsList: React.FC<Props> = ({ goods }) => (
  <div className="GoodList">
    {goods.map(good => (
      <article
        key={good.id}
        className="GoodCard"
      >
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
