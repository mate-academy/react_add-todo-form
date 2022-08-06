import React from 'react';
import classNames from 'classnames';
import { Todo } from '../../type/Todo';
import { UserInfo } from '../UserInfo/UserInfo';
import usersFromServer from '../../api/users';

type Props = {
  todos: Todo[];
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <section className="TodoList">
      {todos.map(todo => (
        <article
          data-id={todo.id}
          className={classNames(
            'TodoInfo',
            {
              'TodoInfo--completed': todo.completed,
            },
          )}
        >
          <h2 className="TodoInfo__title">
            {todo.title}
          </h2>

          <UserInfo user={[...usersFromServer]
            .find(user => user.id === todo.userId) || null}
          />
        </article>
      ))}

    </section>
  );
};
