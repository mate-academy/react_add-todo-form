import React from 'react';
import { TodoInfo } from '../TodoInfo';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';

type Props = {
  todos: Todo[];
  users: User[];
};

export const TodoList: React.FC<Props> = ({ todos, users }) => (
  <section className="TodoList">
    {todos.map(todo => (
      <TodoInfo todo={todo} users={users} key={todo.id} />
    ))}
  </section>
);
