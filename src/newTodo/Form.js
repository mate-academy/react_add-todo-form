import React from 'react';
import PropTypes from 'prop-types';
import { AddUser } from './addElements/AddUser';
import { AddTitle } from './addElements/AddTitle';

const Form = (props) => {
  const { selectUser, users, todosTitle, saveTodos } = props;

  return (
    <form onSubmit={saveTodos}>
      <h1>Add Todo:</h1>

      <select onChange={selectUser} required>
        <option />
        {users.map(user => (
          <React.Fragment key={user.id}>
            <AddUser {...user} />
          </React.Fragment>
        ))}
      </select>

      <AddTitle
        todosTitle={todosTitle()}
      />

      <button
        type="submit"
      >
        Save
      </button>
    </form>
  );
};

export default Form;

Form.propTypes = {
  getId: PropTypes.func.isRequired,
  todosTitle: PropTypes.func.isRequired,
  saveTodos: PropTypes.func.isRequired,
  selectUser: PropTypes.func.isRequired,
  users: PropTypes.arrayOf(PropTypes.object).isRequired,
};
