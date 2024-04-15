import React from 'react';
import { TodoInfo } from '../TodoInfo';
import { ToDo } from '../../types/ToDo';

interface Props {
  todos: ToDo[];
}

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <section className="TodoList">
      {todos.map(todo => {
        return <TodoInfo key={todo.id} todo={todo} />;
      })}
    </section>
  );
};
