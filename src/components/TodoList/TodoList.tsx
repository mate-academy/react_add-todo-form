import React from 'react';
import { Todo } from '../../types/Todo';
import { findUserById } from '../../helpers/findUserById';
import { User } from '../../types/User';
import { TodoInfo } from '../TodoInfo';

interface Props {
  users: User[];
  todos: Todo[];
}

export const TodoList: React.FC<Props> = ({ users, todos }) => {
  return (
    <section className="TodoList">
      {todos.map(todo => {
        const user = findUserById(users, todo.userId);

        return <TodoInfo user={user} todo={todo} key={todo.id} />;
      })}
    </section>
  );
};
