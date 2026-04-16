import React from 'react';
import { TodoInfo } from '../TodoInfo';

interface Todo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
  user: User;
}

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

type Props = {
  todos: Todo[];
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <>
      {todos.map(todo => (
        <TodoInfo key={todo.id} todo={todo} />
      ))}
    </>
  );
};
