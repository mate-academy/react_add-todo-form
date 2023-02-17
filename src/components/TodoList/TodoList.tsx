import React from 'react';
import { TodoInfo } from '../TodoInfo';
import { Todo } from '../../types/TodoType';

type Props = {
  todos: Todo[];
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  const arrId = todos.map(todo => todo.id);

  return (
    <section className="TodoList">
      {todos.map(todo => (
        <TodoInfo key={todo.id} todo={todo} largestId={Math.max(...arrId)} />
      ))}
    </section>
  );
};
