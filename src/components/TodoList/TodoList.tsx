import React from 'react';
import { PreparedTodo } from '../../types/PreparedTodo';
import { TodoInfo } from '../TodoInfo';
import './TodoList.scss';

type Props = {
  todos: PreparedTodo[],
};

export const TodoList: React.FC<Props> = ({ todos }) => (
  <ul className="TodoList">
    {todos.map(preparedTodo => (
      <li
        key={preparedTodo.id}
        className="TodoList__item"
      >
        <div className="TodoList__container">
          <TodoInfo {...preparedTodo} />
        </div>
      </li>
    ))}
  </ul>
);
