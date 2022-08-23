import React from 'react';
import { PreparedToDos } from '../../types/interfaces';
import { TodoInfo } from '../TodoInfo/TodoInfo';

type Props = {
  todos: PreparedToDos[];
};

export const TodoList: React.FC<Props> = ({ todos = [] }) => {
  return (
    <section className="TodoList">
      {todos.map(todo => (
        <TodoInfo key={todo.id} todo={todo} />
      ))}
    </section>
  );
};
