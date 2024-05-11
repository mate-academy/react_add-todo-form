import React, { useRef } from 'react';
import { Good } from '../types/good';
import { GoodCard } from './GoodCard';

type Props = {
  goods: Good[];
  onDelete: (goodId: number) => void;
  onUpdate: (good: Good) => void;
};

const List = ({ goods, onDelete = () => {}, onUpdate = () => {} }: Props) => {
  const ref = useRef(Date.now());

  // eslint-disable-next-line no-console
  console.log('Rendering GoodList after', Date.now() - ref.current);
  ref.current = Date.now();

  return (
    <div className="GoodList">
      {goods.map(good => (
        <GoodCard
          key={good.id}
          good={good}
          onDelete={onDelete}
          onUpdate={onUpdate}
        />
      ))}
    </div>
  );
};

// this is the default implementation of the `arePropsEqual`
function copmareAll(prevProps: Props, nextProps: Props) {
  const prevKeys = Object.keys(prevProps) as (keyof Props)[];
  const nextKeys = Object.keys(nextProps) as (keyof Props)[];

  return (
    prevKeys.length === nextKeys.length &&
    prevKeys.every(key => prevProps[key] === nextProps[key])
  );
}

export function memo(Component: React.FC, arePropsEqual = copmareAll) {
  let prevProps: Props;
  let prevJSX: React.ReactNode;

  return (nextProps: Props) => {
    if (!prevProps || !arePropsEqual(prevProps, nextProps)) {
      prevJSX = Component(nextProps);
    }

    prevProps = nextProps;

    return prevJSX;
  };
}

export const GoodList = React.memo(List, (prevProps, nextProps) => {
  return prevProps.goods === nextProps.goods;
});
