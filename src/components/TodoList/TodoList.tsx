import React from 'react';

import './TodoList.scss';

import { TodoInfo } from '../TodoInfo';

import Todo from '../../types/Todo';

type Props = {
  todos: Todo[];
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
