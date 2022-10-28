import React from 'react';
// eslint-disable-next-line import/no-cycle
import { TodoInfo } from '../TodoInfo';

type Props = {
  usersFromServer: Users[];
  todos: Todo[];
};

export type Todo = {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
};

export type Users = {
  id: number;
  name: string;
  username: string;
  email: string;
};

export const TodoList: React.FC<Props> = ({ usersFromServer, todos }) => {
  return (
    <section>
      {todos.map((todo) => (
        <TodoInfo usersFromServer={usersFromServer} todo={todo} />
      ))}
    </section>
  );
};
