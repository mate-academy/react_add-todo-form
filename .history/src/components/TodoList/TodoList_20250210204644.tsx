import React, { useState } from 'react';
import { TodoInfo } from '../TodoInfo';

// import usersFromServer from '../../api/users';

type Props = {
  todos: {
    id: number;
    title: string;
    completed: boolean;
    userId: number;
  }[];
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <section className="TodoList">
      {todos.map(todo => (
        <TodoInfo key={todo.id} todo={todo} />
      ))}
    </section>
  );
};
