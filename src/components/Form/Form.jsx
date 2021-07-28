import React from 'react';
import PropTypes from 'prop-types';
import { todosType, usersType } from '../../types';

export const Form = ({ selectedUser, enteredTodo,
  todos, addTodo, onChange, users }) => (
    <form
      action="post"
      onSubmit={(event) => {
        event.preventDefault();

        addTodo({
          userId: +selectedUser,
          id: todos.length + 1,
          title: enteredTodo,
          completed: false,
        });
      }}
    >
      <input
        name="enteredTodo"
        required
        placeholder="Title"
        maxLength="20"
        onChange={onChange}
      />
      <select
        required
        name="selectedUser"
        value={selectedUser}
        onChange={onChange}
      >
        <option value="">
          Choose a user
        </option>
        {users.map(user => (
          <option
            key={user.id}
            value={user.id}
          >
            {user.name}
          </option>
        ))
        }
      </select>

      <button
        type="submit"
      >
        Submit
      </button>
    </form>
);

Form.propTypes = {
  selectedUser: PropTypes.string.isRequired,
  enteredTodo: PropTypes.string.isRequired,
  todos: PropTypes.arrayOf(todosType).isRequired,
  users: PropTypes.arrayOf(usersType).isRequired,
  addTodo: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};
