import React from 'react';

import { TodoInfo } from '../TodoInfo/TodoInfo';
import { Todo } from '../../types/types';

type Props = {
  todos: Todo[];
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <>
      {todos.map(todo => (
        <TodoInfo
          id={todo.id}
          title={todo.title}
          completed={todo.completed}
          userId={todo.userId}
          key={todo.id}
        />
      ))}
    </>
  );
};
