import React from 'react';
import PropTypes from 'prop-types';
import User from '../User/User';

const TodoItem = ({
  todo: {
    id, title, completed, user,
  },
}) => (
  <div className="todos__item">
    <h2>{id}</h2>
    <h4>{title}</h4>
    <input type="checkbox" checked={completed} />
    <User user={user} />
  </div>
);

const shape = PropTypes.shape({
  title: PropTypes.string,
  completed: PropTypes.bool,
  id: PropTypes.number,
  user: PropTypes.shape({
    name: PropTypes.string,
    phone: PropTypes.string,
    email: PropTypes.string,
  }),
});

TodoItem.propTypes = {
  todo: shape.isRequired,
};

export default TodoItem;
