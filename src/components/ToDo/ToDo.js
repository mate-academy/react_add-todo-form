import React from 'react';
import { ToDoPropTypes } from '../PropTypes/ToDoPropTypes';
import { User } from '../User';
import './ToDo.css';

export const ToDo = ({ title, completed, user }) => (
  <>
    <div className="todo__user">
      <input
        type="checkbox"
        checked={completed}
        className="ui checkbox"
      />
      <User {...user} />
    </div>
    <p className="todo__task">
      {title}
    </p>
  </>
);
ToDo.propTypes = ToDoPropTypes;
