import { Todo } from '../../types';
import { TodoInfo } from '../TodoInfo';
import React, { FC } from 'react';

type Props = {
  todos: Todo[];
};

export const TodoList: FC<Props> = ({ todos }) => (
  <section className="TodoList">
    {todos.map(todo => (
      <TodoInfo todo={todo} key={todo.id} />
    ))}
  </section>
);
