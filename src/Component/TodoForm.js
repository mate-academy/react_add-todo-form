import React from 'react';
import PropTypes from 'prop-types';
import users from '../api/users';

export class TodoForm extends React.Component {
  state = {
    newTitle: '',
    newUserId: 0,
    titleError: false,
    userError: false,
  };

  handleChange = ({ target: { value } }) => {
    this.setState(prevState => ({
      newTitle: value.replace(/\s/, ' '),
      titleError: false,
    }));
  };

  handleSelect = ({ target: { value } }) => {
    this.setState(prevState => ({
      newUserId: Number(value),
      userError: false,
    }));
  };

  saveHandler = (event) => {
    event.preventDefault();

    if (this.state.newTitle.trim().length === 0) {
      this.setState(prevState => ({ titleError: true }));
    }

    if (this.state.newUserId === 0) {
      this.setState(prevState => ({ userError: true }));
    }

    if (this.state.newTitle.trim().length !== 0 && this.state.newUserId !== 0) {
      this.props.addTodo({
        title: this.state.newTitle,
        userId: this.state.userId,
        completed: false,
        user: users.find(user => user.id === +this.state.newUserId),
      });

      this.setState(prevState => ({
        newTitle: '',
        newUserId: 0,
      }));
    }
  };

  render() {
    return (
      <form onSubmit={this.saveHandler}>
        <label>
          Title:
          <input
            type="text"
            name="text"
            value={this.state.newTitle}
            onChange={this.handleChange}
            placeholder="Write todo"
          />
        </label>
        {this.state.titleError && (
          <div className="todos__error">Please, enter todos text</div>
        )}
        <label>
          User:
          <select
            className="todos__select"
            value={this.state.newUserId}
            onChange={event => this.handleSelect(event)}
          >
            <option value={0}>Choose User</option>
            {users.map(user => (
              <option
                key={user.id}
                value={user.id}
              >
                {user.name}
              </option>
            ))}
          </select>
          {this.state.userError && (
            <div className="todos__error">Please, choose a user</div>
          )}
        </label>
        <button
          className="todos__button"
          type="submit"
        >
          add Todo
        </button>
      </form>
    );
  }
}

TodoForm.propTypes = {
  addTodo: PropTypes.func.isRequired,
};
