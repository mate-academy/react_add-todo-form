import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import users from '../api/users';

export const UsersSelect = ({ user, addTasks, hasUserError }) => (
  <div className="task-title">
    {hasUserError ? (
      <div className="title-error">
        Please select a User Name
      </div>
    ) : (
      <label htmlFor="users" className="new-task">
        User
      </label>
    )}
    <select
      className="fild"
      id="users"
      name="user"
      value={user}
      onChange={addTasks}
    >
      <option className="select-user">Select User</option>
      {users.map(person => (
        <option
          key={person.id}
          value={person.name}
          className={classNames(`select-user`, {
            error: hasUserError === true,
          })}
        >
          {person.name}
        </option>
      ))}
    </select>
  </div>
);

UsersSelect.propTypes = {
  user: PropTypes.objectOf.isRequired,
  addTasks: PropTypes.objectOf.isRequired,
  hasUserError: PropTypes.objectOf.isRequired,
};
