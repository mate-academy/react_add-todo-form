import { Good } from '../types/good';

type Props = {
  goods: Good[];
};

export const GoodsList = ({ goods }: Props) => {
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
            {good.name}
          </p>
        </article>
      ))}
    </div>
  );
};
