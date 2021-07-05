import React from 'react';
import './NewTodo.css';

import PropTypes from 'prop-types';

import users from '../api/users';

export class NewTodo extends React.Component {
  state = {
    selectedUser: 0,
    title: '',
    errorUserSelect: false,
    errorTitleInput: false,
  }

  handleSelectUser = (event) => {
    this.setState({
      selectedUser: +event.target.value,
      errorUserSelect: false,
    });
  }

  handleTitle = (event) => {
    this.setState({
      title: event.target.value.trimStart(),
      errorTitleInput: false,
    });
  }

  clearForm = () => {
    this.setState({
      selectedUser: 0,
      title: '',
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    if (!this.state.title || !this.state.selectedUser) {
      if (!this.state.selectedUser) {
        this.setState({ errorUserSelect: true });
      }

      if (!this.state.title) {
        this.setState({ errorTitleInput: true });
      }

      if (this.state.selectedUser) {
        this.setState({ errorUserSelect: false });
      }

      if (this.state.title) {
        this.setState({ errorTitleInput: false });
      }

      return;
    }

    this.props.addTodo({
      userId: this.state.selectedUser,
      id: this.props.newId,
      title: this.state.title,
      user: users.find(user => user.id === this.state.selectedUser),
    });

    this.clearForm();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="form">
        <label>
          New task:
          <br />
          <input
            id="newTask"
            placeholder="Write task to add"
            className="form__input"
            value={this.state.title}
            onChange={this.handleTitle}
          />
        </label>
        {this.state.errorTitleInput && <span>Please, write a task to do.</span>}
        <br />
        <label>
          To:
          <br />
          <select
            className="form__select"
            value={this.state.selectedUser}
            onChange={this.handleSelectUser}
          >
            <option value={0} hidden>--Choose a User--</option>
            {users.map(user => (
              <option
                value={user.id}
                key={user.id}
              >
                {user.name}
              </option>
            ))}
          </select>
        </label>
        {this.state.errorUserSelect && <span>Please, select the user.</span>}
        <br />
        <button type="submit" className="form__button">Add</button>
      </form>
    );
  }
}

NewTodo.propTypes = {
  addTodo: PropTypes.func.isRequired,
  newId: PropTypes.number.isRequired,
};
