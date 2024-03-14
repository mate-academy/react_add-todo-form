import React from 'react';

import { TodoType } from '../../types/TodoType';
import { TodoInfo } from '../TodoInfo';

interface Props {
  todos: TodoType[];
}

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <section className="TodoList">
      {todos.map(todo => (
        <TodoInfo todo={todo} key={todo.id} />
      ))}
    </section>
  );
};
