import React from 'react';

import { Todo } from '../../types/todo';
import { TodoInfo } from '../TodoInfo/TodoInfo';

type Props = {
  todosList: Todo[];
};

export const TodoList: React.FC<Props> = ({ todosList }) => (
  <section className="TodoList">
    {todosList.map(todo => (
      <TodoInfo todo={todo} key={todo.id} />
    ))}
  </section>
);
