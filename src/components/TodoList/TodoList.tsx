import React from 'react';

import { TodoInfo } from '../TodoInfo';
import { Todo } from '../../Types/Todo';

type Props = {
  todos: Todo[];
};

export const TodoList: React.FC<Props> = ({ todos }) => (
  <section className="TodoList">
    {todos.map(todoItem => <TodoInfo key={todoItem.id} todo={todoItem} />)}
  </section>
);
