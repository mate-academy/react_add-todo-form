import React, { Fragment } from 'react';
import { Todo } from '../../types/Todo';
import { TodoInfo } from '../TodoInfo';

type Props = {
  todos: Todo[];
};

export const TodoList: React.FC<Props> = ({ todos }) => (
  <section className="TodoList">
    {todos.map(todo => (
      <Fragment key={todo.id}>
        <TodoInfo todo={todo} />
      </Fragment>
    ))}
  </section>
);
