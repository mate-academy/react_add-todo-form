import classNames from 'classnames';
import React from 'react';
import { Todo } from '../../types/Todo';

import './TodoList.scss';

type Props = {
  todos: Todo[],
  changeStatus: (id: number) => void,
};

const normalizeText = (text: string) => {
  return text[0].toUpperCase()
    + text.slice(1).toLowerCase();
};

export const TodoList: React.FC<Props> = ({ todos, changeStatus }) => (
  <div className="Todo">
    <ul className="Todo__list">
      {todos.map(({
        id,
        title,
        userId,
        completed,
      }) => (
        <li
          key={id}
          className={classNames('Todo__item', { 'Todo--completed': completed })}
        >
          <div className="Todo__element">
            <span className="Todo__id">
              {`${id} - `}
            </span>

            <span className="Todo__status">
              {completed ? 'Todo completed' : 'Still in work...'}
            </span>

            <span className="Todo__title">
              {`${normalizeText(title)}`}
            </span>

            <span className="Todo__userId">
              {` ${userId}`}
            </span>
          </div>

          <input
            type="checkbox"
            checked={completed}
            onChange={() => {
              changeStatus(id);
            }}
          />
        </li>
      ))}
    </ul>
  </div>
);
