import React from 'react';
import { TodoInfo } from '../TodoInfo';
import { Todo } from '../../sourse/Todo';

type Props = {
  todos: Todo[];
};

export const TodoList = ({ todos }: Props) => (
  <section className="TodoList">
    {todos.map(todo => (
      <TodoInfo todo={todo} key={todo.id} />
    ))}
  </section>
);
