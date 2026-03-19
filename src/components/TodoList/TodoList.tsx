import React from 'react';
import { TodoInfo } from '../TodoInfo';

interface Props {
  todos: {
    id: number;
    title: string;
    completed: boolean;
    user?: {
      name: string;
      email: string;
    };
  }[];
}

export const TodoList: React.FC<Props> = ({ todos }) => (
  <section className="TodoList">
    {todos.map(todo => (
      <TodoInfo key={todo.id} todo={todo} />
    ))}
  </section>
);
