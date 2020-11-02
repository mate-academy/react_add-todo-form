import React from 'react';
import PropTypes from 'prop-types';
import { User } from './User';
import './Todo.css';

export const Todo = ({ title, user }) => (
  <div className="ui list">
    <div className="ui items">
      {`Task: ${title}`}
    </div>
    <div className="block">
      <div className="position">
        <User {...user} />
      </div>
      <div className="completed">
        Not completed
      </div>
    </div>
  </div>
);
Todo.propTypes = PropTypes.shape({
  title: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
}).isRequired;
