import React from 'react';
import users from '../../api/users';
import './NewTodo.css';
import { ShapeNewTodo } from '../Shapes';

export const NewTodo = (props) => {
  const { onImputChange,
    onTodoAdd,
    onUserAdd,
    value,
    index,
    error,
    errorUser } = props;

  return (
    <form onSubmit={event => onTodoAdd(event)}>
      <label>
        <h3>New ToDo:</h3>
        <input
          className={(error.length === 0) ? 'input' : 'input input--error'}
          type="text"
          value={value}
          placeholder="New todo"
          onChange={onImputChange}
        />
        <div className="error">{error}</div>
      </label>
      <label>
        <h3>Select User:</h3>
        <select
          className={(errorUser.length === 0)
            ? 'select' : 'select select--error'}
          value={index}
          onChange={event => onUserAdd(event)}
        >
          <>
            <option>Select User</option>
            {users.map(user => (
              <option
                key={user.name}
              >
                {user.name}
              </option>
            ))}
          </>
        </select>
        <div className="error">{errorUser}</div>
      </label>
      <br />
      <button type="submit">Add Todo</button>
      <br />
    </form>
  );
};

NewTodo.propTypes = ShapeNewTodo;
