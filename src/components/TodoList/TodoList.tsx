import React from 'react';

import { Todo } from '../../types/Todo';
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
        return <TodoInfo todo={todo} users={users} key={todo.id} />;
      })}
    </section>
  );
};
