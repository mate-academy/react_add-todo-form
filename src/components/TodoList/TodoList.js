import React from 'react';
import { TodoListProps } from '../../props/TodoListProps';
import { Todo } from '../Todo/Todo';

export const TodoList = todos => (
  <div>
    {Object
      .values(todos)
      .map(({ id, title, completed, user }) => (
        <Todo
          key={id}
          title={title}
          completed={completed}
          user={user}
        />
      ))
    }
  </div>
);

TodoList.propTypes = TodoListProps;
