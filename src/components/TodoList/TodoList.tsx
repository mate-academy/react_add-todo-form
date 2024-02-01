import React from 'react';
import { TodoInfo } from '../TodoInfo';
import { Todo } from '../../types/TODO';

type Props = {
  todos: Todo[];
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <section className="TodoList">
      {todos.map(
        todo =>
          <TodoInfo todo={todo} data-id={todo.id} key={todo.id} />,
      )}
    </section>
  );
};
