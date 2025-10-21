import React from 'react';
import { TodoInfo } from '../TodoInfo/TodoInfo';

type User = {
  id: number;
  name: string;
  username: string;
  email: string;
};

type Todo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
  user: User;
};

type Props = {
  todos: Todo[];
};

export const TodoList = ({ todos }: Props) => {
  return (
    <div>
      {todos.map((todo) => (
        <TodoInfo key={todo.id} todo={todo} />
      ))}
    </div>
  );
};
