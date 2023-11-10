import React from 'react';
import { Todo } from '../../props/todoProps';
import { User } from '../../props/userProps';
import { TodoInfo } from '../TodoInfo';

type Props = {
  todos: Todo[];
  users: User[];
};

export const TodoList: React.FC<Props> = ({ todos, users }) => {
  return (
    <section className="TodoList">
      {todos.map((todo: Todo) => (
        <TodoInfo
          key={todo.id}
          todo={todo}
          users={users}
        />
      ))}
    </section>
  );
};
