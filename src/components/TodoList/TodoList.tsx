import React from 'react';
import { TodoInfo } from '../TodoInfo/TodoInfo';

export type User = {
  name: string;
  email: string;
};

export type Todo = {
  id: number;
  title: string;
  user: User;
  completed: boolean;
};

type Props = {
  todos: Todo[];
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <section className="TodoList">
      {todos.map(todo => (
        <TodoInfo key={todo.id} todo={todo} />
      ))}
    </section>
  );
};
