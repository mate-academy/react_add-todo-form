import { FC } from 'react';

export const TodoInfo: FC<{ title: string }> = ({ title }) => (
  <h2 className="TodoInfo__title">
    {title}
  </h2>
);
