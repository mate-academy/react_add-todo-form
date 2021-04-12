import React from 'react';
import PropTypes from 'prop-types';

import users from '../api/users';

export const AddForm = ({
  titleError,
  title,
  userError,
  selectedUser,
  handleChange,
  addTodo,
}) => (
  <>
    <form
      className="form"
      onSubmit={(event) => {
        event.preventDefault();
        addTodo();
      }}
    >
      <input
        name="title"
        type="text"
        placeholder="Enter the title"
        value={title}
        onChange={handleChange}
      />
      <div className="error">
        {titleError
          ? `Please enter the title`
          : null
        }
      </div>
      <select
        name="selectedUser"
        value={selectedUser}
        onChange={handleChange}
      >
        <option value="">
          Choose a user
        </option>
        {users.map(user => (
          <option value={user.name} key={user.id}>
            {user.name}
          </option>
        ))}
      </select>
      <div className="error">
        {userError
          ? `Please choose a user`
          : null
        }
      </div>
      <button
        type="submit"
      >
        Add
      </button>
    </form>
  </>
);

AddForm.propTypes = {
  titleError: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  userError: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired,
  addTodo: PropTypes.func.isRequired,
  selectedUser: PropTypes.string.isRequired,
};
