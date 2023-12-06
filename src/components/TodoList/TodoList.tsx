import React from 'react';

import { PreparedTodo } from '../../types';
import { TodoInfo } from '../TodoInfo';

type Props = {
  todos: PreparedTodo[];
};

export const TodoList: React.FC<Props> = ({ todos }) => (
  <section className="TodoList">
    {todos.map((todo) => (
      <TodoInfo key={todo.id} todo={todo} />
    ))}
  </section>
);
