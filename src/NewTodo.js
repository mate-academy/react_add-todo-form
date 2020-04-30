import React from 'react';
import PropTypes from 'prop-types';

class NewTodo extends React.Component {

  render() {
    const { users, handleChange, selectChange, handleSubmit, tempTitle, tempUser } = this.props;

    return (
      <form className="form" onSubmit={event => handleSubmit(event)}>
        <label htmlFor="title">Please, write TODO:&nbsp;</label>
        <input
          value={tempTitle}
          type="text"
          id="title"
          onChange={event => handleChange(event.target.value)}
        />
        <select
          value={tempUser}
          onChange={event => selectChange(event.target.value)}
        >
          <option>Choose a user</option>
          {users.map(user => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
        <button type="submit">ADD</button>
      </form>
    );
  }
}

NewTodo.propTypes = {
  handleChange: PropTypes.func.isRequired,
  selectChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  tempTitle: PropTypes.string.isRequired,
  tempUser: PropTypes.string.isRequired,
  users: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.object,
    ]).isRequired,
  ).isRequired,
};

export default NewTodo;
