import React from 'react';
import classNames from 'classnames';
import { PreparedTodo } from '../../react-app-env';
import { UserInfo } from '../UserInfo/UserInfo';

type Props = {
  todo: PreparedTodo,
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const completed = todo.completed ? 'completed' : 'not completed';

  return (
    <section className="message has-background-warning p-1">
      <div className="has-background-warning-light p-1">
        <div className="title" data-cy="title">{todo.title}</div>
        <div
          className={classNames('subtitle is-6', {
            'has-text-danger': !todo.completed,
          })}
          data-cy="status"
        >
          {completed}
        </div>
        {todo.user && (
          <UserInfo user={todo.user} />
        )}
      </div>
    </section>
  );
};
