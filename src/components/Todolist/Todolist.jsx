import React from 'react';
import PropTypes from 'prop-types';

export const TodoList = ({ preparedTodos }) => (
  <ul>
    {
      preparedTodos.map(task => (
        <div key={task.id}>
          <h4>
            <strong>{task.title.toUpperCase()}</strong>
          </h4>
          <p>{task.user}</p>
          <p>
            id:
            <i>{task.id}</i>
          </p>
        </div>
      ))
    }
  </ul>
);

const PreparedTodosType = PropTypes.shape({
  userId: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  user: PropTypes.string.isRequired,
});

TodoList.propTypes = PropTypes.arrayOf(PreparedTodosType).isRequired;
