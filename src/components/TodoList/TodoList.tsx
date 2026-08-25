import React from 'react';
import { TodoInfo } from '../TodoInfo';

type User = {
  id: number;
  name: string;
  username: string;
  email: string;
};

type Todo = {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
  user: User;
};

type Props = {
  todos: Todo[];
};

export const TodoList = ({ todos }: Props) => {
  return (
    <>
      {todos.map(todo => (
        <TodoInfo todo={todo} key={todo.id} />
      ))}
    </>
  );
};
