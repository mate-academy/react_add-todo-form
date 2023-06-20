import React from 'react';
// eslint-disable-next-line import/no-cycle
import { Todo } from '../../App';
// eslint-disable-next-line import/no-cycle
import { TodoInfo } from '../TodoInfo';

interface Props {
  todos: Todo[];
}

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <section className="TodoList">
      {todos.map(todo => (
        <TodoInfo todo={todo} />
      ))}
    </section>
  );
};
