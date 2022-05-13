import React, { useState } from 'react';
import { Todos } from '../../react-app-env';
import './TodoItem.scss';

type Props = {
  todo: Todos;
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const {
    userId,
    id,
    title,
    completed,
  } = todo;

  const [status, setStatus] = useState(completed);

  const changeStatus = () => {
    setStatus((prev) => !prev);
  };

  return (
    <li
      className={`item ${status && 'item--done'}`}
      onClick={changeStatus}
      role="presentation"
    >
      <h2 className="item__header">{title}</h2>
      <p className="item__text">
        <span className="item__info">{`User id: ${userId}`}</span>
        <span className="item__info">{`Status: ${status ? 'Done' : 'In progress'}`}</span>
        <span className="item__info">{`Task #: ${id}`}</span>
      </p>
    </li>
  );
};
