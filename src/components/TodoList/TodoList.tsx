import React from 'react';
import { TodoInfo } from '../TodoInfo/TodoInfo';

interface TodoListProps {
  todos: {
    id: number;
    title: string;
    completed: boolean;
    userId: number;
    user: {
      id: number;
      name: string;
      username: string;
      email: string;
    };
  }[];
}

export const TodoList: React.FC<TodoListProps> = ({ todos }) => {
  return (
    <section className="TodoList">
      {todos.map(todo => (
        <TodoInfo key={todo.id} todo={todo} />
      ))}
    </section>
  );
};
