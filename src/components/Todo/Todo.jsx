import React from 'react';
import { todoType } from '../propTypes/todoType';

export const Todo = ({ title, user, completed }) => (
  <>
    {/* eslint-disable-next-line */}
    <li className="list-group-item d-flex justify-content-between align-items-center">
      <span>{user.name}</span>
      <p className="m-0">
        {`Todo: ${title}`}
      </p>

      <label className="form-check-label mt-3">
        <input
          type="checkbox"
          className="form-check-input m-0 mx-5"
          checked={completed}
        />
        {completed ? 'done' : 'Need more time'}
      </label>
    </li>
  </>
);

Todo.propTypes = todoType.isRequired;
