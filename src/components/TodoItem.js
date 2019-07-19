/* eslint-disable jsx-a11y/label-has-for */
import React from 'react';
import PropTypes from 'prop-types';
import User from './User';

const TodoItem = ({
  id, title, completed, user, onChangeTodoStatus,
}) => (
  <tr>
    <td>
      {id}
    </td>

    <td>
      <input
        id={`todo${id}`}
        type="checkbox"
        checked={completed}
        onChange={() => onChangeTodoStatus(id)}
      />
    </td>

    <td>
      <label htmlFor={`todo${id}`}>
        {title}
      </label>
    </td>

    <td>
      <User {...user} />
    </td>
  </tr>
);

TodoItem.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  completed: PropTypes.bool,
  user: PropTypes.shape({
    name: PropTypes.string,
  }),
  onChangeTodoStatus: PropTypes.func.isRequired,
};

TodoItem.defaultProps = {
  completed: false,
  user: null,
};

export default TodoItem;
