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
        <React.Fragment key={todo.id}>
          <TodoInfo todo={todo} />
        </React.Fragment>
      ))}
    </>
  );
};
