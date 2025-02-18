import React from 'react';
import { TodoInfo } from '../TodoInfo';

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

interface TodoInterface {
  user: User | null;
  id: number;
  title: string;
  completed: boolean;
  userId: number;
}

interface Props {
  todos: TodoInterface[];
}

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <section className="TodoList">
      {todos.map((todo: TodoInterface) => (
        <TodoInfo key={todo.id} todo={todo} />
      ))}
    </section>
  );
};
