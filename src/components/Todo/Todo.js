import React from 'react';
import './Todo.css';
import PropTypes from 'prop-types';

import { User } from '../User';

export const Todo = ({ todo }) => (
  <>
    <div className="border">
      <input type="checkbox" defaultChecked={todo.completed} />
      <div>{todo.title}</div>
      <User user={todo.user} />
    </div>
  </>
);

Todo.propTypes = {
  todo: PropTypes.shape({
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
    user: PropTypes.object.isRequired,
  }),
};

Todo.defaultProps = {
  todo: {},
};
