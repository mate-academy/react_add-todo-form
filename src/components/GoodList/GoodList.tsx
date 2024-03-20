import { Good } from '../../types/Good';

type Props = {
  goods: Good[];
  onDelete: (goodId: number) => void;
};

export const GoodList: React.FC<Props> = ({ goods, onDelete }) => (
  <div className="GoodList">
    {goods.map(good => (
      <article key={good.id} className="GoodCard">
        <p
          className="GoodCard__title"
          style={{ color: good.color?.name || 'black' }}
        >
          <button type="button" onClick={() => onDelete(good.id)}>
            x
          </button>

          {good.name}
        </p>
      </article>
    ))}
  </div>
);
