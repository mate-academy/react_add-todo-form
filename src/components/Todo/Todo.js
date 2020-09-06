import React, { useState } from 'react';
import classes from 'classnames';
import PropTypes from 'prop-types';
import './Todo.css';

const Todo = ({ userId, id, title, completed, users }) => {
  const [done, isChecked] = useState(completed);

  const handleChange = (event) => {
    if (event.target.checked) {
      isChecked(!done);
    } else {
      isChecked(!done);
    }
  };

  return (
    <div key={id} className={classes('todo', { completed: done })}>
      <label>
        <input
          type="checkbox"
          checked={done}
          onChange={handleChange}
        />
      </label>
      {users.map(user => (
        user.id === userId
          ? <h4 key={user.id}>{user.name}</h4>
          : null))}
      <h4>Task:</h4>
      <p>{title}</p>
    </div>
  );
};

export default Todo;

Todo.propTypes = {
  userId: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  users: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
};
