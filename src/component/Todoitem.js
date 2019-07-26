import React from 'react';
import PropTypes from 'prop-types';
import User from './User';

const TodoItem = props => (
  <tr className="Todo">
    <td>
      {props.todo.id}
    </td>
    <td>
      <User user={props.todo.user} />
    </td>
    <td>
      <input type="checkbox" checked={props.todo.completed} />
    </td>
    <td>
      {props.todo.title}
    </td>
  </tr>
);

TodoItem.propTypes = {
  todo: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      userId: PropTypes.number,
      title: PropTypes.string,
      completed: PropTypes.bool,
    })
  ).isRequired,
};

export default TodoItem;
