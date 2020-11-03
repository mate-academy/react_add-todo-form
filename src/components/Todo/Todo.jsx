import React from 'react';
import { todoType } from '../propTypes/todoType';

export const Todo = ({ title, user, completed }) => (
  <>
    <span>{user.name}</span>
    <p className="m-0">
      {`Todo: ${title}`}
    </p>

    <label className="form-check-label mt-3">
      <input
        type="checkbox"
        className="form-check-input m-0 mx-5"
        onClick={() => !completed}
      />
      {completed ? 'done' : 'Need more time'}
    </label>
  </>
);

Todo.propTypes = todoType.isRequired;
