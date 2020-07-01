import React from 'react';
import { TodoShape } from '../../Shapes';
import './Todo.css';

export const Todo = (props) => {
  const { title, completed, name, id } = props;

  return (
    <li className="item">
      <p className="item__name">{name}</p>
      <span>
        Todo ID -
        {' '}
        {id}
      </span>
      <p className="item__title">{title}</p>
      {
        completed
          ? <p className="item__completed">Done</p>
          : <p className="item__uncompleted">Not Done Yet</p>
      }
    </li>
  );
};

Todo.propTypes = TodoShape.isRequired;
