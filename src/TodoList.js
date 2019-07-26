import React from 'react';
import propTypes from 'prop-types';

function ToDoList({ currentUser, currentValue }) {
  return (
    <div>
      {currentUser}
      <br />
      {currentValue}
    </div>
  );
}

ToDoList.propTypes = {
  currentUser: propTypes.string.isRequired,
  currentValue: propTypes.string.isRequired,
};

export default ToDoList;
