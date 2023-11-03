import React from 'react';
import { Todos } from '../../Types/Todos';
import { TodoInfo } from '../TodoInfo/TodoInfo';

type Props = {
  todos: Todos[];
};

export const TodoList: React.FC<Props> = ({ todos }) => (
  <section className="TodoList">
    {todos.map(todo => (
      <TodoInfo todo={todo} key={todo.id} />
    ))}
  </section>
);
