import React from 'react';
import classNames from 'classnames';
import { UserInfo } from '../UserInfo';
import { TodoInfo } from '../TodoInfo';
import { TodoWithUser } from '../../type/TodoWithUser';

type Props = {
  todos: TodoWithUser[];
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    todos.map(todo => {
      const {
        completed,
        id,
        title,
        user,
      } = todo;

      return (
        <article
          data-id={id}
          className={classNames('TodoInfo', {
            'TodoInfo--completed': completed,
          })}
          key={id}
        >
          <TodoInfo title={title} />
          {user && <UserInfo user={user} />}
        </article>
      );
    })
  );
};
