import React from 'react';

import { Todo } from '../../types/Todo';
import './TodoList.css';

import { UserInfo } from '../UserInfo';

type Props = {
  todoList: Todo[],
};

export const TodoList: React.FC<Props> = ({ todoList }) => {
  return (
    <ul className="TodoList">
      {todoList.map((elem) => (
        <li key={elem.id} className="TodoList__item">
          <p className="TodoList__title">{elem.title}</p>
          <p
            className="TodoList__completed"
          >
            {elem.completed
              ? 'Completed'
              : 'No completed'}
          </p>
          {elem.user
            ? <UserInfo userInfo={elem.user} />
            : 'User is not found'}
        </li>
      ))}
    </ul>
  );
};
