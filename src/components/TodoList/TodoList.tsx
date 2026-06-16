import React from 'react';
import type { Todo } from '../../api/todos';

import { TodoInfo } from '../TodoInfo/TodoInfo';

type TodoListProps = {
  todos: Todo[];
};

export const TodoList: React.FC<TodoListProps> = ({ todos }) => (
  <section className="TodoList">
    {todos.map(currentTodo => (
      <TodoInfo key={currentTodo.id} todo={currentTodo} />
     
    ))}
  </section>
);
