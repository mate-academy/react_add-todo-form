import React from 'react';

import { Todo } from '../types/Todo';
import { TodoInfo } from '../TodoInfo';

type Proms = {
  todos: Todo[];
};

export const TodoList: React.FC<Proms> = ({ todos }) => (
  <section className="TodoList">
    {todos.map(todo => (
      <TodoInfo key={todo.id} todo={todo} />
    ))}
  </section>
);
