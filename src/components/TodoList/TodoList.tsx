import React from 'react';
import { TodoInfo } from '../TodoInfo';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
};

export const TodoList: React.FC<Props> = ({ todos }) => (
  <section className="TodoList">
    <ul className="List">
      {todos.map(todo => <TodoInfo todo={todo} key={todo.id} />)}
    </ul>
  </section>
);
