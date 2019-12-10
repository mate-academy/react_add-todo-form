import React from 'react';
import PropTypes from 'prop-types';
import User from './User';

const ToDoItem = ({ todo: { title, user, completed } }) => (
  <tr>
    <td>
      {title}
    </td>
    <User userData={user} />
  </tr>
);

ToDoItem.propTypes = { todo: PropTypes.arrayOf(PropTypes.object).isRequired };

export default ToDoItem;
