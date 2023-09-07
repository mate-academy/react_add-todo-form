import React from 'react';
import { TodoWithUser } from '../../types';
import { TodoInfo } from '../TodoInfo';

type Props = {
  todos: TodoWithUser[];
};

export const TodoList: React.FC<Props> = ({ todos }) => (
  <section className="TodoList">
    {todos.map((todo) => (
      <TodoInfo
        key={todo.id}
        todo={todo}
      />
    ))}
  </section>
);
