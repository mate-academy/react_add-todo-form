import React from 'react';
import { TodoInfo } from '../TodoInfo';
import { Todo, User } from '../../types';

type Props = {
  todos: Todo[];
  users: User[];
};

export const TodoList: React.FC<Props> = ({ todos, users }) => {
  return (
    <section className="TodoList">
      {todos.map((todoinfo: Todo) => {
        return <TodoInfo key={todoinfo.id} todo={todoinfo} users={users} />;
      })}
    </section>
  );
};
