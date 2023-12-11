import React from 'react';
import { Completed } from '../../types/types';
import { TodoInfo } from '../TodoInfo';

interface Props {
  todos: Completed[];
}

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <section className="TodoList">
      {todos.map((todo) => {
        return (
          <TodoInfo
            key={todo.id}
            todo={todo}
          />
        );
      })}
    </section>
  );
};
