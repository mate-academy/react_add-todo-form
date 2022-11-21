import React from 'react';
import classNames from 'classnames';

type Props = {
  title: string;
  completed: boolean;
};

export const TodoInfo: React.FC<Props> = ({ title, completed }) => {
  const todoStatus = completed === false ? 'Not done' : 'Done';

  return (
    <div className={classNames('TodoInfo',
    { TodoInfo__completed: completed === true })}>
      <h1 data-cy="TodoInfo__title">
        {title}
      </h1>

      <div data-cy="status">
        {todoStatus}
      </div>
    </div>
  );
};
