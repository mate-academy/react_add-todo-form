import React from 'react';
import { Todo } from '../../types/Todo';

import { TodoInfo } from '../TodoInfo/TodoInfo';

type Props = {
  allTodos: Todo[],
};

export const TodoList :React.FC<Props> = ({ allTodos }) => {
  return (
    <section className="TodoList">
      {allTodos.map(todo => (
        <TodoInfo todo={todo} key={todo.id} />
      ))}
    </section>
  );
};
