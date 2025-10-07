// TodoList.tsx
import React from 'react';
import { Todo, User } from '../types';
import { TodoInfo } from '../TodoInfo';

type Props = {
  todos: Todo[];
  users: User[];
};

export const TodoList: React.FC<Props> = ({ todos, users }) => {
  return (
    <section className="TodoList">
      {todos.map(todo => {
        const user = users.find(userItem => userItem.id === todo.userId);

        return user ? <TodoInfo key={todo.id} todo={todo} user={user} /> : null;
      })}
    </section>
  );
};
