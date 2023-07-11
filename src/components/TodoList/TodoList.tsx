import React from 'react';
import { TodoInfo } from '../TodoInfo';
import { ToDo } from '../../services/interfaces';

interface Props {
  todos: ToDo[],
}

export const TodoList: React.FC<Props> = ({ todos }) => (
  <section className="TodoList">
    {todos.map(todo => (
      <TodoInfo
        todo={todo}
        key={todo.id}
      />
    ))}
  </section>
);
