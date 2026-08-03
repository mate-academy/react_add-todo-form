import React from 'react';
import { Todos } from '../../types/Todos';
import { User } from '../../types/User';
import { TodoInfo } from '../TodoInfo';

type Props = {
  todos: Todos[];
  users?: User[];
};

export const TodoList: React.FC<Props> = ({ todos, users = [] }) => {
  return (
    <section className="TodoList">
      {todos.map(todo => {
        const selectedUser = users.find(user => user.id === todo.userId);

        return <TodoInfo key={todo.id} todo={todo} user={selectedUser} />;
      })}
    </section>
  );
};
