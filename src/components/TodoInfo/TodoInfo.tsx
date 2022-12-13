import React from 'react';

type Props = {
  title: string;
  id: number;
};

export const TodoInfo:React.FC<Props> = ({ title, id }) => (
  <h2 className="TodoInfo__title" data-id={id}>{title}</h2>
);
