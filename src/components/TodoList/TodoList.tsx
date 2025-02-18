import React from 'react';
import { TodoInfo } from '../TodoInfo';

interface Todo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
}

interface Props {
  todos: Todo[];
}

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <section className="TodoList">
      {todos.map(todo => (
        <TodoInfo key={todo.id} todo={todo} />
      ))}
    </section>
  );
};
