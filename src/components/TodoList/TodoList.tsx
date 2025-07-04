import React from 'react';
import { TodoInfo } from '../TodoInfo';

interface User {
  id: number;
  name: string;
  email: string;
}

interface Todo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
  user?: User;
}

interface TL {
  todos: Todo[];
}

export const TodoList: React.FC<TL> = ({ todos }) => {
  return (
    <section className="TodoList">
      {todos.map(todo => (
        <TodoInfo key={todo.id} todo={todo} />
      ))}
    </section>
  );
};
