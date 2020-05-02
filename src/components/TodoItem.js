import React from 'react';
import { todoType } from '../typedefs/todoType';

const TodoItem = ({ item }) => {
  const { id, title, completed, user } = item;

  return (
    <tr>
      <td>{id}</td>
      <td>{title}</td>
      <td>{completed ? 'Yes' : 'No'}</td>
      <td>{user.name}</td>
      <td>{user.id}</td>
    </tr>
  );
};

TodoItem.propTypes = {
  item: todoType.isRequired,
};

export default TodoItem;
