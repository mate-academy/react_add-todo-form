import React from 'react';
import { Todo, TodoInfo } from '../TodoInfo/TodoInfo';
import './TodoList.scss';

type Props = {
  todos: Todo[];
};

export const TodoList: React.FC<Props> = ({ todos }) => (
  <ul className="todoList">
    {todos.map(todo => (
      <li className="todoItem" key={todo.id}>
        <TodoInfo todo={todo} />
      </li>
    ))}
  </ul>
);
