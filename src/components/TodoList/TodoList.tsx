import React from 'react';

import { TodoInfo } from '../TodoInfo/TodoInfo';

export const TodoList = ({
  todos,
}) => {
  return (
    todos.map(todo => {
      return (
        <TodoInfo
          id={todo.id}
          title={todo.title}
          completed={todo.completed}
          userId={todo.userId}
        />
      );
    })
  );
};
