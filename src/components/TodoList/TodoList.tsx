import React from 'react';
import { PreparedTodo } from '../../interfaces/Todo';
import { TodoInfo } from '../TodoInfo';

type Props = {
  todos: PreparedTodo[];
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
