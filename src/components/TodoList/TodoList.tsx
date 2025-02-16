import React, { Fragment } from 'react';
import { Todo } from '../../types/Todo';

import { TodoInfo } from '../TodoInfo';

interface Todos {
  todos: Todo[];
}

export const TodoList = ({ todos }: Todos) => {
  return (
    <section className="TodoList">
      {todos.map(todo => (
        <Fragment key={todo.id}>
          <TodoInfo todo={todo} />
        </Fragment>
      ))}
    </section>
  );
};
