import React from 'react';
import './TodoList.css';
import { FullTodo } from '../../react-app-env';
import { TodoInfo } from '../TodoInfo';

interface Props {
  listOfTodos: FullTodo[];
}

export const TodoList: React.FC<Props> = ({ listOfTodos }) => (
  <ul className="todo-list">
    {listOfTodos.map(item => (
      <li className="todo-list__item" key={item.id}>
        <TodoInfo fullTodo={item} />
      </li>
    ))}
  </ul>
);
