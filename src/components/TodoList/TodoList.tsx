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
  user?: User;
};

type Props = {
  todos: Todo[];
};

export const TodoList: React.FC<Props> = ({ todos }) => (
  <>
    {todos.map(todo => (
      <TodoInfo key={todo.id} todo={todo} />
    ))}
  </>
);
