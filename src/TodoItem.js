import PropTypes from 'prop-types';
import React from 'react';

const TodoItem = ({ todo: { user, id, title } }) => (
  <li className="todo">
    <p>{`${id}. ${title}`}</p>
    <p className="todo__name">
      {`${user.name}, id: ${user.id}`}
    </p>
  </li>
);

TodoItem.propTypes = {
  todo: PropTypes
    .shape({
      user: PropTypes.oneOfType([PropTypes.object]).isRequired,
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
    }).isRequired,
};

export default TodoItem;
