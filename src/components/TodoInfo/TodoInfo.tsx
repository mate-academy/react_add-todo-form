import React from 'react';
import classNames from 'classnames';

type Props = {
  status: boolean;
  title: string;
};

export const TodoInfo: React.FC<Props> = ({ status, title }) => {
  return (
    <>
      <div className={classNames(
        'todo-list__item-status',
        {
          'todo-list__item-status--completed': status,
        },
      )}
      />
      <span>{title}</span>
    </>
  );
};
