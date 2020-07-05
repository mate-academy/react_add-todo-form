import React from 'react';
import users from '../../api/users';
import './NewTodo.css';
import { ShapeNewTodo } from '../Shapes';

export const NewTodo = (props) => {
  const { handleInput,
    handleNewTodo,
    handleUserAdd,
    value,
    index,
    isTitleValid,
    isUserSelected } = props;

  const titleErrorMessage = isTitleValid ? '' : 'Please enter the title';
  const userSelectErrorMessage = isUserSelected ? '' : 'Please choose a user';

  return (
    <form onSubmit={event => handleNewTodo(event)}>
      <label>
        <h3>New ToDo:</h3>
        <input
          className={(isTitleValid) ? 'input' : 'input input--error'}
          type="text"
          value={value}
          placeholder="New todo"
          onChange={handleInput}
        />
        <div className="error">{titleErrorMessage}</div>
      </label>
      <label>
        <h3>Select User:</h3>
        <select
          className={(isUserSelected)
            ? 'select' : 'select select--error'}
          value={index}
          onChange={event => handleUserAdd(event)}
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
        <div className="error">{userSelectErrorMessage}</div>
      </label>
      <br />
      <button type="submit">Add Todo</button>
      <br />
    </form>
  );
};

NewTodo.propTypes = ShapeNewTodo;
