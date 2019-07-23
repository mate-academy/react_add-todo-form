/* eslint-disable arrow-parens, no-shadow */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addTodo } from '../../redux/todoList';
import users from '../../api/users';

class NewTodo extends Component {
  state = {
    title: '',
    userId: 0,
    errors: {
      valid: true,
      title: '',
      userId: '',
    },
  };

  handleChange = event => {
    const { dataset, value } = event.target;
    const pattern = /[^a-z\s]+/gi;

    if (dataset.key === 'title' && value.match(pattern)) {
      return;
    }

    this.setState(prev => ({
      [dataset.key]: value,
      errors: {
        ...prev.errors,
        [dataset.key]: '',
      },
    }));
  };

  handleSubmit = event => {
    event.preventDefault();
    const { title, userId } = this.state;
    const errors = {
      valid: true,
      title: '',
      userId: '',
    };

    if (!title) {
      errors.title = 'Please, enter a title of the task';
      errors.valid = false;
    }

    if (!Number(userId)) {
      errors.userId = 'Please, choose a user';
      errors.valid = false;
    }

    if (errors.valid) {
      const { addTodo, todos } = this.props;
      const todo = {
        userId: Number(userId),
        id: todos.length + 1,
        title,
        completed: false,
        user: users.find(user => user.id === Number(userId)),
      };

      addTodo(todo);
      this.setState({
        title: '',
        userId: 0,
        errors,
      });
    } else {
      this.setState({ errors });
    }
  };

  render() {
    const { errors } = this.state;

    return (
      <form className="form" onSubmit={this.handleSubmit}>
        <label htmlFor="input-title-name">
          <input
            id="input-title-name"
            className="form__input form__border-bottom"
            type="text"
            placeholder="Enter title"
            data-key="title"
            value={this.state.title}
            onChange={this.handleChange}
          />
        </label>
        {errors.title && (
          <span className="form__error">{errors.title}</span>
        )}
        <select
          data-key="userId"
          className="form__select form__border-bottom"
          value={this.state.userId}
          onChange={this.handleChange}
        >
          <option value="0">Choose a user</option>
          {users.map(user => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
        {errors.userId && (
          <span className="form__error">{errors.userId}</span>
        )}
        <button className="form__submit" type="submit">
          Add Task
        </button>
      </form>
    );
  }
}

NewTodo.propTypes = {
  addTodo: PropTypes.func.isRequired,
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
      userId: PropTypes.number.isRequired,
    })
  ).isRequired,
};

const mapState = ({ todoList }) => ({ todos: todoList.todos });
const mapDispatch = { addTodo };

export default connect(
  mapState,
  mapDispatch
)(NewTodo);
