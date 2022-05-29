import React from 'react';
import classNames from 'classnames';
import { Todos } from '../../types/Todos';
import { UserInfo } from '../UserInfo';

type Props = {
  todo: Todos,
};

export const TodoInfo: React.FC<Props> = ({ todo }) => (
  <>
    <div className="todoInfo">
      <h2
        className="todoInfo__title"
        data-cy="title"
      >
        {todo.title}
      </h2>
      <span
        data-cy="status"
        className={classNames(
          'todoInfo__status',
          { 'todoInfo__status_not-completed': !todo.completed },
        )}
      >
        {todo.completed ? 'Completed' : 'Not completed'}
      </span>
    </div>
    {todo.user && (
      <UserInfo
        key={todo.id}
        user={todo.user}
      />
    )}
  </>
);
