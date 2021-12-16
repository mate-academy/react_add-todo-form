import React from 'react';

import { Todo } from '../types/Todo';
import { TodoItem } from './TodoItem/TodoItem';

type Props = {
  todos: Todo[];
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <ul className="todoList">
      {todos.map(todo => (
        <li className="todoList__todoItem" key={todo.id}>
          <TodoItem todo={todo} />
        </li>
      ))}
    </ul>
  );
};
