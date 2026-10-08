import React from 'react';
import { TodoInfo } from '../TodoInfo';
import { Todo } from '../../types.ts/Todo';

interface Props {
  todos: Todo[];
}

export const TodoList: React.FC<Props> = ({ todos }) => (
  <section className="TodoList">
    {todos.map(todo => {
      return <TodoInfo key={todo.id} todo={todo} />;
    })}
  </section>
);
