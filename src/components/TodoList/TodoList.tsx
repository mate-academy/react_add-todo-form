import React from 'react';
import { TodoInfo } from '../TodoInfo';

type Props = {
  todos: {
    user: {
      id: number;
      name: string;
      username: string;
      email: string;
    };
    id: number;
    title: string;
    completed: boolean;
    userId: number;
  }[];
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <section className="TodoList">
      {todos.map(todo => (
        <TodoInfo todo={todo} key={todo.id} />
      ))}
    </section>
  );
};
