import React from 'react';
import { User } from '../User';
import { TodoPropTypes } from '../TodoPropTypes';
import './Todo.css';

export const Todo = function Todo({ title, userId, id, user }) {
  return (
    <React.Fragment key={id}>
      <span className="ms-2 me-auto">
        <span className="text-muted">
          {'Task: '}
        </span>
        <p className="fw-bold text-uppercase">
          {`"${title}"`}
        </p>
      </span>

      <p>
        <User id={userId} name={user.name} />
      </p>
    </React.Fragment>
  );
};

Todo.propTypes = TodoPropTypes;
