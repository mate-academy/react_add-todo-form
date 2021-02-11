import React from 'react';
import PropTypes from 'prop-types';
import { User } from './User';

export const Todo = ({ title, completed, user }) => (
  <>
    <div className="main">
      <div className="left"><User {...user} /></div>
      <div className="middle">{`${title}`}</div>
      <div className="right">
        {`${!completed ? 'In Progress' : 'Completed'}`}
      </div>
    </div>
  </>
);

Todo.propTypes = {
  title: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
};
