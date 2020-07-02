import React from 'react';
import { ShapeNewTodo, ShapeNewTodoDefault } from '../Shapes/ShapeNewTodo';

export const NewTodo = (props) => {
  const {
    users,
    onChangeUser,
    onChangeNewTodo,
    onSubmit,
    wrongInput,
    errorMessage,
    currentTitle,
  } = props;

  return (
    <div>
      <form onSubmit={event => onSubmit(event)}>
        {wrongInput && (
          <div
            className="alert alert-danger"
            role="alert"
          >
            <strong>
              Oh snap!
            </strong>
            {errorMessage}
          </div>
        )}
        <select onChange={event => onChangeUser(event)}>
          <option>Choose a user</option>
          {users.map(user => (
            <option
              key={user.id}
              value={user.id}
            >
              {user.name}
            </option>
          ))}
        </select>
        <input
          type="text"
          value={currentTitle}
          maxLength="25"
          placeholder="Type todo"
          onChange={event => onChangeNewTodo(event.target.value)}
        />
        <button
          type="submit"
        >
          Add
        </button>
      </form>

    </div>
  );
};

NewTodo.defaultProps = ShapeNewTodoDefault;

NewTodo.propTypes = ShapeNewTodo.isRequired;
