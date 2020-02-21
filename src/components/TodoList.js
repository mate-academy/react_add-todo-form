import React from 'react';

import PropTypes from 'prop-types';
import './TodoList.css';

const TodoList = (props) => {
  const { tasks } = props;

  return (
    <table>
      <thead>
        <tr>
          <th scope="col">N</th>
          <th scope="col">User</th>
          <th scope="col">Title</th>
        </tr>
      </thead>
      <tbody>
        {tasks.map((task) => {
          const { id, title, user } = task;

          return (
            <tr key={id}>
              <td>{id}</td>
              <td>{user.name}</td>
              <td>{title}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

TodoList.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      user: PropTypes.object,
    }).isRequired,
  ).isRequired,
};

export default TodoList;
