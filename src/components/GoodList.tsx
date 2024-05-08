import { Good } from '../types/good';

type Props = {
  goods: Good[];
  onDelete: (goodId: number) => void;
};

export const GoodsList = ({ goods, onDelete }: Props) => {
  // eslint-disable-next-line no-console
  console.log('Rendering GoodList');

  return (
    <div className="GoodList">
      {goods.map(good => (
        <article key={good.id} className="GoodCard">
          <p
            className="GoodCard__title"
            style={{ color: good.color?.name || 'black' }}
          >
            <button onClick={() => onDelete(good.id)}>x</button>
            {good.name}
          </p>
        </article>
      ))}
    </div>
  );
};
