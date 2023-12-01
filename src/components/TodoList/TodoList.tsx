import * as React from 'react';

import { Todo } from '../../interfaces/interfaces';
import { TodoInfo } from '../TodoInfo';

interface TodoListProps {
  todos: Todo[];
}

export const TodoList: React.FC<TodoListProps> = ({ todos }) => {
  return (
    <>
      {todos.map((todo) => (
        <TodoInfo todo={todo} key={todo.id} />
      ))}
    </>
  );
};
