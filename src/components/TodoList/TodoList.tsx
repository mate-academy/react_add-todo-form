import React from 'react';
import { TodoInfo } from '../TodoInfo';

interface TodoGeneral {
  id: number;
  title: string;
  completed: boolean;
  name?: string;
  email?: string;
}

export const TodoList: React.FC<{
  todos: TodoGeneral[];
}> = ({ todos }) => {
  return (
    <section className="TodoList">
      {todos.map(todo => (
        <TodoInfo key={todo.id} todo={todo} />
      ))}
    </section>
  );
};
