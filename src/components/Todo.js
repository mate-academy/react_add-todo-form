import React from 'react';
import PropTypes from 'prop-types';

function Todo({ toDoThing }) {
  return (
    <>
      <p>
        <strong> User name:</strong>
        {toDoThing.userName}
      </p>
      <p>
        <strong>What to do: </strong>
        {toDoThing.title}
      </p>
      <p>
        <strong>Complete: </strong>
        {(toDoThing.completed) ? 'Yes' : 'No'}
      </p>
    </>
  );
}

Todo.propTypes = {
  toDoThing: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
    userName: PropTypes.string.isRequired,
  }).isRequired,
};

export default Todo;
