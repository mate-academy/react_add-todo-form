import React from 'react';
import PropTypes from 'prop-types';
import TodoItem from './TodoItem';

const TodoList = ({ todo }) => {
  const items = todo.map(item => (
    <TodoItem itemData={item} />
  ));

  return (
    <table className="TodoList">
      <thead>
        <tr>
          <th className="status-row">Status</th>
          <th className="id-row">Id</th>
          <th className="task-row">Task</th>
          <th className="name-row">Name</th>
        </tr>
      </thead>
      <tbody>
        {items}
      </tbody>
    </table>
  );
};

TodoList.propTypes = {
  todo: PropTypes.arrayOf(PropTypes.shape(
    {
      title: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
      user: PropTypes.object.isRequired,
    }
  )).isRequired,
};

export default TodoList;
