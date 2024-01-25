import React from 'react';
import { Good } from './types/Good';
import { GoodItem } from './GoodItem';

type Props = {
  goods: Good[];
  onDelete?: (goodId: number) => void,
  onUpdate?: (good: Good) => void;
};

export const GoodList: React.FC<Props> = React.memo(
  ({ goods, onDelete, onUpdate }) => (
    <div className="GoodList">
      {goods.map(good => (
        <GoodItem good={good} onDelete={onDelete} onUpdate={onUpdate} />
      ))}
    </div>
  ),
  (prevProps, nextProps) => prevProps.goods === nextProps.goods,
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
      prevJSX = Component({ ...nextProps });
    }

    prevProps = nextProps;

    return prevJSX;
  };
}
