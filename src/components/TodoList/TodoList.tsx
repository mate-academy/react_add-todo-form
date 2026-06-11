import React from 'react';
import { TodoInfo } from '../TodoInfo/TodoInfo';

interface User {
  id: number;
  name: string;
  email: string;
  username: string;
}
interface Todo {
  id: number;
  user?: User | null;
  userId: number;
  title: string;
  completed: boolean;
}

type Props = {
  todos: Todo[];
};

export const TodoList: React.FC<Props> = ({ todos = [] }) => (
  <section className="TodoList">
    {todos.map(todo => (
      <TodoInfo key={todo.id} todo={todo} />
    ))}
  </section>
);
