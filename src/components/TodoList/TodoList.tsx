import React from 'react';
import { PreparedTodoType } from '../../Types/PreparedTodosType';

import './TodoList.scss';

type Props = {
  preparedTodosProps: PreparedTodoType[],
};

export const TodoList: React.FC<Props> = ({ preparedTodosProps }) => (
  <ul className="usersList">
    {preparedTodosProps.map((todo: PreparedTodoType) => (
      <li key={todo.id} className="usersList__user">
        <h3 className="title-todo">
          {todo.title}
        </h3>
        <p>
          Id
          {' '}
          {todo.id}
          {'    '}
          User id
          {' '}
          {todo.userId}
        </p>
      </li>
    ))}
  </ul>
);
