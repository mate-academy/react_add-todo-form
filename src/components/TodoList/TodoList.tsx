import React from 'react';

import { TodoItem } from '../TodoItem';
import { Todo } from '../../types/Todo';

import './TodoList.scss';

type Props = {
  todos: Todo[];
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <ul className="TodoList">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
};
