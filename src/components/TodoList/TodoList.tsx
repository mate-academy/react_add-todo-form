import React from 'react';
import { TodoInfo } from '../TodoInfo/TodoInfo';
import { User, Todo } from '../../react-app-env';

type Props = {
  users: User[],
  todos: Todo[],
};

export const TodoList: React.FC<Props> = ({ users, todos }) => (
  <section className="TodoList">
    <section>
      {todos.map((todo) => (
        <TodoInfo users={users} todo={todo} />
      ))}
    </section>
  </section>
);
