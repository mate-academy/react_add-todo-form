import React from 'react';
import { Todo } from './Todo';

interface Props {
  todos: any,
}

export const TodoList: React.FC<Props> = ({ todos }) => (
  <div className="todoListContainer">
    <ul className="todoList">
      {todos.map((todo: any) => (
        <li
          key={todo.id}
          className="todo"
        >
          <Todo {...todo} />
        </li>
      ))}
    </ul>
  </div>
);
