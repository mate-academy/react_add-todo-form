import React from 'react';
import classNames from 'classnames';
import { PreparedTodos } from '../types';

import './TodoItem.scss';

type Props = {
  todo: PreparedTodos;
};

export const TodoItem: React.FC<Props> = ({ todo }) => (
  <li className={classNames('List__item', { 'List__item--completed': todo.completed })} key={todo.id}>
    <div className="Item">
      <div className="Item__block-title">
        <h3 className="Item__title">{`${todo.id}. ${todo.title}`}</h3>
        <span className="Item__status">{todo.completed ? 'Completed' : 'Work in progress'}</span>
      </div>
      <div className="Item__block-user">
        <p className="Item__user">{`For: ${todo.userName}`}</p>
        <input type="checkbox" checked={todo.completed} />
      </div>
    </div>
  </li>
);
