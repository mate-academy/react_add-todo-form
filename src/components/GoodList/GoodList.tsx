import { Good } from '../../types/Good';

type Props = {
  goods: Good[];
};

export const GoodList: React.FC<Props> = ({ goods }) => (
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
