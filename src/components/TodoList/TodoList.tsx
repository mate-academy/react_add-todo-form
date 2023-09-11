import React from 'react';
import { TodoInfo } from '../TodoInfo';

type Todo = {
  id: number,
  title: string,
  completed: boolean,
  userId: number,
  user: User | null,
};

type User = {
  id: number,
  name: string,
  username: string,
  email: string,
};

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
