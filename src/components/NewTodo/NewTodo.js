import React from 'react';
import PropTypes from 'prop-types';

const NewTodo = ({ newtask }) => (
  <>
    {newtask.map(task => (
      <tr key={task.id}>
        <td>{task.id}</td>
        <td>{task.task}</td>
        <td>{task.userId}</td>
      </tr>
    ))}
  </>
);

NewTodo.propTypes = {
  newtask: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    task: PropTypes.string,
    userId: PropTypes.number,
  })).isRequired,
};

export default NewTodo;
