import React from 'react';
import { TodoInfo } from '../TodoInfo';

type Props = {
  todos: {
    id: number;
    title: string;
    userId: number;
    completed: boolean;
    user?: {
      id: number;
      name: string;
      username: string;
      email: string;
    };
  }[];
};

export const TodoList = ({ todos }: Props) => {
  return (
    <section className="TodoList">
      {todos.map(todo => (
        <TodoInfo todo={todo} key={todo.id} />
      ))}
    </section>
  );
};
