import React from 'react';
import { Good } from './types/Good';

type Props = {
  goods: Good[];
  onDelete?: (goodId: number) => void,
};

export const GoodList: React.FC<Props> = React.memo(
  ({
    goods,
    onDelete = () => {},
  }) => {
    // eslint-disable-next-line no-console
    console.log('Render GoodList', new Date().toLocaleTimeString());

    return (
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
              <button type="button" onClick={() => onDelete(good.id)}>
                x
              </button>

              {good.name}
            </p>
          </article>
        ))}
      </div>
    );
  },
  // arePropsEqual
  (prevProps, nextProps) => {
    return prevProps.goods === nextProps.goods;
  },
);

function compareProps(prevProps: Props, nextProps: Props) {
  if (Object.keys(prevProps).length !== Object.keys(nextProps).length) {
    return false;
  }

  return Object.keys(prevProps).every(
    (key) => prevProps[key as keyof Props] === nextProps[key as keyof Props],
  );
}

export function memo(
  Component: React.FC<Props>,
  arePropsEqual = compareProps,
) {
  let prevProps: Props | void;
  let prevJSX: React.ReactNode | void;

  return (nextProps: Props) => {
    if (!prevProps || !arePropsEqual(prevProps, nextProps)) {
      prevJSX = Component(nextProps);
    }

    prevProps = nextProps;

    return prevJSX;
  };
}
