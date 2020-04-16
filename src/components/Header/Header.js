import React from 'react';
import './Header.css';
import PropTypes from 'prop-types';

export function Header({ todoArr }) {
  return (
    <h1>
      <span>TASKS: </span>
      {todoArr.length}
    </h1>
  );
}

Header.propTypes = {
  todoArr: PropTypes.arrayOf(
    PropTypes.shape({
      userId: PropTypes.number,
      id: PropTypes.number,
      title: PropTypes.string,
      completed: PropTypes.bool,
    })
  ).isRequired,
};

// Header.propTypes = {
//   todoArr: PropTypes.array.isRequired
// }
