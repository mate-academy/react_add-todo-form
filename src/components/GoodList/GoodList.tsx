import { Good } from '../../types/Good';

type Props = {
  goods: Good[];
  onRemove: (goodId: number) => void;
};

export const GoodList: React.FC<Props> = ({ goods, onRemove }) => (
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
