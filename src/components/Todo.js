import React from 'react';
import PropTypes from 'prop-types';

const Todo = ({ item: { title, completed, id, userId } }) => (
  <>
    <p className="todo-list__cell">{id}</p>
    <p className="todo-list__cell">{title}</p>
    <p className="todo-list__cell">{completed ? 'Completed' : 'Not yet'}</p>
    <p className="todo-list__cell">{userId}</p>
  </>
);

Todo.propTypes = {
  item: PropTypes.shape({
    userId: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  }).isRequired,
};

export default Todo;
