import React from 'react';
import PropTypes from 'prop-types';
import User from './User';

const TodoItem = ({ itemData }) => (
    <tr className="TodoItem">
      <td className="row1"><input type="checkbox" checked={itemData.completed} /></td>
      <td className="row4">{itemData.id}</td>
      <td className="row2">{itemData.title}</td>
      <td className="row3"><User userData={itemData.user} /></td>
    </tr>
);

TodoItem.propTypes = {
  itemData: PropTypes.shape(
    {
      title: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
      user: PropTypes.object.isRequired,
    }
  ).isRequired,
};

export default TodoItem;
