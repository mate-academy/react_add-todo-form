import React from 'react';
import { ToDoPropTypes } from '../../PropTypes/ToDoPropTypes';
import { User } from '../User/User';
import './todo.scss';

export const ToDo = ({ title, completed, user }) => (
  <>
    <input
      type="checkbox"
      checked={completed}
      className="todo__checkbox"
    />
    <p>
      {title}
    </p>
    <User {...user} />
  </>
);

ToDo.propTypes = ToDoPropTypes;
