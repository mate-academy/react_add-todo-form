import React from 'react';
import { Todo } from '../../types';
import { TodoInfo } from '../TodoInfo';

interface Props {
  todos: Todo[];
}

export const TodoList: React.FC<Props> = ({ todos }) => {
  const maxId = Math.max(...todos.map(todo => todo.id), 0);

  return (
    <section className="TodoList">
      {todos.map(todo => (
        <TodoInfo key={todo.id} todo={{ ...todo, id: maxId + 1 }} />
      ))}
    </section>
  );
};
