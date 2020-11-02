import React from 'react';
import { User } from '../User/User';

import { TodoPropTypes } from '../propTypes/TodoPropTypes';

export const Todo = ({ title, completed, user }) => (
  <div className="list-group-item">
    <h3>
      {`Task: `}
      {title}
    </h3>

    <div>
      <User {...user} />

      {completed
        ? <div className="alert alert-success mt-3">Completed</div>
        : <div className="alert alert-danger mt-3">Not completed</div>}
    </div>
  </div>
);

Todo.propTypes = TodoPropTypes;
