import React from 'react';
import { TodoShape } from '../shapes/TodoShape';
import './Todo.scss';

export const Todo = ({ title, completed }) => (
  <li
    className="
      list-group-item
      list-group-item-action
      rounded-pill
      dropdown my-1
      text-uppercase
    "
  >
    <label className="js-my-checkbox">
      <input
        type="checkbox"
        defaultChecked={!!completed}
        className="js-my-checkbox__checkbox"
      />
      <span className="js-my-checkbox__checkmark" />
    </label>
    {title}
  </li>
);

Todo.propTypes = TodoShape;
