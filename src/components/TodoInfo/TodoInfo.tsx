import React from 'react';

type Props = {
  title: string;
};

export const TodoInfo:React.FC<Props> = ({ title }) => (
  <h2 className="TodoInfo__title">{title}</h2>
);
