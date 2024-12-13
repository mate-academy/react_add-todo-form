import React from 'react';
import { TodoInfo } from '../TodoInfo';

type TodoListProps = {
  todos: {
    id: number;
    title: string;
    completed: boolean;
    user?: {
      name: string;
      email: string;
    } | null;
  }[];
};

export const TodoList: React.FC<TodoListProps> = ({ todos }) => (
  <section className="TodoList">
    {todos.map(todo => (
      <TodoInfo key={todo.id} todo={todo} />
    ))}
  </section>
);
