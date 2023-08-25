import React from 'react';
import { User } from '../../types/User';
import { Todo } from '../../types/Todo';
import { TodoInfo } from '../TodoInfo';

type Props = {
  todos: Todo[],
  users: User[]
};

export const TodoList: React.FC<Props> = ({ todos, users }) => (
  <section className="TodoList">
    {todos.map(todo => (
      <TodoInfo todo={todo} users={users} />
    ))}
  </section>
);
