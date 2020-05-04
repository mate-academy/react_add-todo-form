import React from 'react';
import PropTypes from 'prop-types';
import Todo from './Todo';

function TodoList({ preparedTodos }) {
  return (
    <ul>
      {preparedTodos.map(toDoThing => (
        <li key={toDoThing.id}>
          <Todo toDoThing={toDoThing} />
        </li>
      ))}
    </ul>
  );
}

TodoList.propTypes = {
  preparedTodos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
    userName: PropTypes.string.isRequired,
  })).isRequired,
};

export default TodoList;
