import React from 'react';
import './TodoList.css';
import { TodoItem } from '../TodoItem';
import { Todo } from '../types/Todo';

type Props = {
  todos: Todo [];
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <ul className="TodoList">
      {todos.map(todo => (
        <li
          key={todo.id}
          className="TodoList__item"
        >
          <TodoItem todo={todo} />
        </li>
      ))}
    </ul>
  );
};
