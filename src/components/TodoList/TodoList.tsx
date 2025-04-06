import React from 'react';
import { TodoInfo, TodoProps } from '../TodoInfo';

type Props = {
  todos: TodoProps[];
};

export const TodoList: React.FC<Props> = ({ todos }) => (
  <section className="TodoList">
    {todos.map(todo => (
      <TodoInfo key={todo.id} todo={todo} />
    ))}
  </section>
);
