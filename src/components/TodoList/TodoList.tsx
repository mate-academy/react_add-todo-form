import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoInfo } from '../TodoInfo';

export interface Props {
  todos: Todo[];
}

export const TodoList: React.FC<Props> = ({ todos }) => (
  <section className="TodoList">
    {todos.map(todo => {
      return <TodoInfo todo={todo} key={todo.id} />;
    })}
  </section>
);
