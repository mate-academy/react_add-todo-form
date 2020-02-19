import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class TaskCreator extends Component {
  static propTypes = {
    onAddTask: PropTypes.func.isRequired,
    users: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
      }).isRequired,
    ).isRequired,
  }

  state = {
    title: '',
    userId: 0,
    inputError: false,
    selectError: false,
  }

  handleSelect = (e) => {
    this.setState({
      userId: Number(e.target.value),
      selectError: false,
    });
  }

  handleTextInput = (e) => {
    this.setState({
      title: e.target.value,
      inputError: false,
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { title, userId } = this.state;
    let error = false;

    if (title.trim().length < 2 || title.trim().length > 40) {
      error = true;
      this.setState({
        inputError: true,
      });
    }

    if (userId === 0) {
      error = true;
      this.setState({
        selectError: true,
      });
    }

    if (!error) {
      const { users } = this.props;

      const user = users.find(person => person.id === userId);

      this.props.onAddTask({
        userId,
        title,
        user,
      });

      this.setState({
        title: '',
        userId: 0,
      });
    }
  }

  render() {
    const { users } = this.props;
    const { title, userId, inputError, selectError } = this.state;

    return (
      <form onSubmit={this.handleSubmit} className="form">
        <div className="titleContainer">
          <input
            className="input"
            onChange={this.handleTextInput}
            type="text"
            value={title}
            placeholder="Input your task ..."
          />
          {inputError
            && (
              <span className="error">
              Please, enter valid task
              </span>
            )}
        </div>

        <div className="nameContainer">
          <select
            className="select"
            value={userId}
            onChange={this.handleSelect}
          >
            <option value={0} disabled>Choose user</option>
            {users.map(person => (
              <option value={person.id} key={person.id}>{person.name}</option>
            ))}
          </select>
          {selectError
          && (
            <span className="error">
            Please, choose user
            </span>
          )}
        </div>
        <button className="button" type="submit">Add</button>
      </form>
    );
  }
}
