import React from 'react';
import './User.css';
import { UserPropTypes } from '../TodoPropTypes';

export const User = function User({ id, name }) {
  return (
    <div className="d-flex justify-content-around">
      <span>
        <span className="text-muted">
          {'User ID: '}
        </span>
        <span className="user">
          {id}
        </span>
      </span>

      <span>
        <span className="text-muted">
          {'User Name: '}
        </span>
        <span className="user">
          {name}
        </span>
      </span>

    </div>
  );
};

User.propTypes = UserPropTypes;
