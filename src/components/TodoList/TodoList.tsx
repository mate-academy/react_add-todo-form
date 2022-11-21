import React from 'react';
import { TodoInfo } from '../TodoInfo/TodoInfo';
import { User, Todo } from '../../react-app-env';

type Props = {
  usersFromServer: User[],
  todos: Todo[],
};

export const TodoList: React.FC<Props> = ({ usersFromServer, todos }) => (
  <section>
    {todos.map((todo) => (
      <TodoInfo usersFromServer={usersFromServer} todo={todo} />
    ))}
  </section>
);
