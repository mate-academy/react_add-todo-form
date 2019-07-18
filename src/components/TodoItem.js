/* eslint-disable jsx-a11y/label-has-for */
import React from 'react';
import PropTypes from 'prop-types';
import User from './User';

const TodoItem = ({
  id, title, completed, user, todos,
}) => {
  const updateStatus = (event) => {
    const todoId = event.target.id.slice(4);
    const newTodos = [...todos];
    const index = newTodos.findIndex(todo => todo.id === +todoId);
    const todo = newTodos[index];

    todo.completed = !todo.completed;
    newTodos.splice(index, 1, todo);
    todo.updateAppState({ todosList: [...newTodos] });
  };

  return (
    <tr>
      <td>
        {id}
      </td>

      <td>
        <input
          id={`todo${id}`}
          type="checkbox"
          checked={completed}
          onChange={updateStatus}
        />
      </td>

      <td>
        <label htmlFor={`todo${id}`}>
          {title}
        </label>
      </td>

      <td>
        <User {...user} />
      </td>
    </tr>
  );
};

TodoItem.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  completed: PropTypes.bool,
  user: PropTypes.shape({
    name: PropTypes.string,
  }),
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
};

TodoItem.defaultProps = {
  completed: false,
  user: null,
};

export default TodoItem;
