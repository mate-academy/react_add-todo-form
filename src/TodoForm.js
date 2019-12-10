import React from 'react';
import PropTypes from 'prop-types';
import users from './api/users';

class TodoForm extends React.Component {
  state = {
    newTitle: '',
    newUserId: 0,
    titleError: false,
    userError: false,
  };

  handleChange = ({ target: { value } }) => {
    this.setState(prevState => ({
      newTitle: value,
      titleError: false,
    }));
  };

  handleSelect = ({ target: { value } }) => {
    this.setState(prevState => ({
      newUserId: value,
      userError: false,
    }));
  };

  handleSubmit = (event) => {
    event.preventDefault();

    if (!this.state.newTitle) {
      this.setState(prevState => ({ titleError: true }));
    }

    if (!this.state.newUserId) {
      this.setState(prevState => ({ userError: true }));
    }

    if (this.state.newTitle && this.state.newUserId) {
      this.props.addTodo({
        title: this.state.newTitle,
        userId: +this.state.newUserId,
        completed: false,
        user: users.find(person => person.id === +this.state.newUserId),
      });

      this.setState(prevState => ({
        newTitle: '',
        newUserId: 0,
      }));
    }
  };

  render() {
    const { newTitle, newUserId, titleError, userError } = this.state;
    const { handleChange, handleSelect, handleSubmit } = this;

    return (
      <form onSubmit={handleSubmit}>
        <input
          className="todos__form-item todos__form-item--input"
          name="text"
          value={newTitle}
          onChange={handleChange}
          placeholder="Write TODO"
        />
        {titleError && (
          <div className="todos__error">Please, enter the title</div>
        )}
        <select
          className="todos__form-item todos__form-item--select"
          value={newUserId}
          onChange={event => handleSelect(event)}
        >
          <option value={0}>Chose User</option>
          {users.map(user => (
            <option key={user.id} value={user.id}>{user.name}</option>
          ))}
        </select>
        {userError && (
          <div className="todos__error">Please, choose a user</div>
        )}
        <button
          className="todos__form-item todos__form-item--submit"
          type="submit"
        >
          add TODO
        </button>
      </form>
    );
  }
}

TodoForm.propTypes = { addTodo: PropTypes.func.isRequired };

export default TodoForm;
