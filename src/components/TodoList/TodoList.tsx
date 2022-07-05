import React, { FC, Fragment } from 'react';

import { Todo } from '../../types/Todo';
import { LinkedUsers } from '../../types/User';

import TodoItem from '../TodoItem/TodoItem';

import './TodoList.scss';

type Props = {
  todos: Todo[],
  users: LinkedUsers,
};

export const TodoList: FC<Props> = React.memo(({ todos, users }) => {
  return (
    <ul className="todoList">
      {todos.map(({
        title, completed, id, userId,
      }) => (
        <Fragment key={id}>
          <TodoItem
            id={id}
            title={title}
            user={users[userId]}
            completed={completed}
          />
        </Fragment>
      ))}
    </ul>
  );
});
