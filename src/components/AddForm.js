import React from 'react';
import PropTypes from 'prop-types';

import users from '../api/users';

export const AddForm = ({
  titleError,
  title,
  userError,
  chooseUser,
  handleChenge,
  addTodos,
}) => (
  <>
    <form
      className="form"
      onSubmit={(event) => {
        event.preventDefault();
      }}
    />
    <div className="error">
      {titleError
        ? `Please enter the title`
        : null
      }
      {userError
        ? `Please choose a user`
        : null
      }
    </div>
    <input
      name="title"
      type="text"
      placeholder="Enter the title"
      value={title}
      onChange={handleChenge}
    />
    <select
      name="chooseUser"
      value={chooseUser}
      onChange={handleChenge}
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
    <button
      type="submit"
      onClick={addTodos}
    >
      Add
    </button>
  </>
);

AddForm.propTypes = {
  titleError: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  userError: PropTypes.bool.isRequired,
  handleChenge: PropTypes.func.isRequired,
  addTodos: PropTypes.func.isRequired,
  chooseUser: PropTypes.string.isRequired,
};
