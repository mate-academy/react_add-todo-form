import React from 'react';
import { ToDo } from '../../types/ToDo';
import { TodoInfo } from '../TodoInfo';

type Props = {
  todos: ToDo[],
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <ul className="TodoList">
      {todos.map(todo => (
        <TodoInfo key={todo.id} todo={todo} />
      ))}
    </ul>
  );
};
