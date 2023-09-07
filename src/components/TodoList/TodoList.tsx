import React from 'react';
import { PreparedTodo } from '../../types';
import { TodoInfo } from '../TodoInfo';

type Props = {
  todos: PreparedTodo[];
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <section className="TodoList">
      {todos.map(todo => (
        <TodoInfo
          data-id={todo.id}
          todo={todo}
          key={todo.id}
        />
      ))}
    </section>
  );
};
