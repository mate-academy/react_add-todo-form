import React from 'react';

type Props = {
  completed: boolean;
  title: string;
};

export const TodoInfo: React.FC<Props> = (({ completed, title }) => (
  <>
    <div className="item__content">{title}</div>
    <div className="item__content">{completed ? 'done' : 'unfinished'}</div>
  </>
));
