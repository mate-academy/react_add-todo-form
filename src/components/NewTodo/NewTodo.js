/* eslint-disable arrow-parens, no-shadow */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addTodo } from '../../redux/todos';
import users from '../../api/users';

class NewTodo extends Component {
  state = {
    title: '',
    completed: false,
    userId: 0,
  };

  handleChange = event => {
    const { dataset, value } = event.target;

    this.setState({ [dataset.key]: value });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { title, completed, userId } = this.state;
    const { addTodo, todos } = this.props;

    const todo = {
      userId: Number(userId),
      id: todos.length + 1,
      title,
      completed,
      user: users.find(user => user.id === Number(userId)),
    };

    addTodo(todo);
    this.setState({
      title: '',
      completed: false,
      userId: 0,
    });
  };

  render() {
    return (
      <form className="form" onSubmit={this.handleSubmit}>
        <label htmlFor="input-title-name">
          <input
            id="input-title-name"
            className="form__input"
            type="text"
            placeholder="Enter title of your task"
            data-key="title"
            value={this.state.title}
            onChange={this.handleChange}
            required
          />
        </label>
        <select
          data-key="completed"
          className="form__select"
          value={this.state.completed}
          onChange={this.handleChange}
        >
          <option value="false">Not completed</option>
          <option value="true">Completed</option>
        </select>
        <select
          data-key="userId"
          className="form__select"
          value={this.state.userId}
          onChange={this.handleChange}
        >
          <option value="0">Choose a user</option>
          {users.map(user => (
            <option value={user.id}>{user.name}</option>
          ))}
        </select>
        <button className="form__submit" type="submit">
          Add Task
        </button>
      </form>
    );
  }
}

NewTodo.propTypes = {
  addTodo: PropTypes.func.isRequired,
  todos: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

const mapState = ({ todos }) => ({ todos });
const mapDispatch = { addTodo };

export default connect(
  mapState,
  mapDispatch
)(NewTodo);
