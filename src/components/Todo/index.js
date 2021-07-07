import React from 'react';
import PropTypes from 'prop-types';
import './Todo.css';

function Todo({ user, title, completed }) {
  return (
    <>
      <div className="Todo">
        <input
          type="checkbox"
          value={completed}
          className="Todo__checkbox"
        />
        <h4 className="Todo__title">
          Task:
          {` ${title}`}
        </h4>
        <p>
          UserId:
          {` ${user.id}`}
        </p>
      </div>
    </>
  );
}

Todo.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }).isRequired,
  title: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
};

export default Todo;
