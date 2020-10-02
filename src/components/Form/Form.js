import React, { Component } from 'react';
import './Form.css';

import PropTypes from 'prop-types';

export class Form extends Component {
  state = {
    titleOfTodo: '',
    userIdOfTodo: '',
    errorInTitle: '',
    errorInUser: '',
    errorOfLength: '',
  }

  checkOnErrors = () => {
    this.setState((state) => {
      if (state.userIdOfTodo) {
        this.setState({
          errorInUser: '',
        });
      }

      if (state.titleOfTodo) {
        this.setState({
          errorInTitle: '',
        });
      }

      if (state.titleOfTodo.length <= 50) {
        this.setState({
          errorOfLength: '',
        });
      }
    });
  }

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
    this.checkOnErrors();
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const { titleOfTodo, userIdOfTodo } = this.state;
    const { addnewTodo, users, todos } = this.props;

    if (!userIdOfTodo) {
      this.setState({
        errorInUser: 'Please choose a user',
      });
    } else if (!titleOfTodo) {
      this.setState({
        errorInTitle: 'Please enter the title',
      });
    } else if (titleOfTodo.length > 50) {
      this.setState({
        errorOfLength:
        'Title length is more than 50 symbols.Please, make your title shorter',
      });
    } else {
      const newTodo = {
        userId: users.find(user => user.name === userIdOfTodo).id,
        id: todos.length + 1,
        title: titleOfTodo,
        completed: false,
      };

      addnewTodo(newTodo);
      this.setState({
        titleOfTodo: '',
        userIdOfTodo: '',
        errorInTitle: '',
        errorInUser: '',
        errorOfLength: '',
      });
    }
  }

  render() {
    const {
      titleOfTodo,
      userIdOfTodo,
      errorInTitle,
      errorInUser,
      errorOfLength,
    } = this.state;
    const { users } = this.props;

    return (
      <div className="field">
        <form onSubmit={this.handleSubmit}>
          <select
            name="userIdOfTodo"
            value={userIdOfTodo}
            onChange={this.handleChange}
          >
            <option value="">
              Choose a user
            </option>
            {users.map(user => (
              <option
                key={user.id}
                value={user.name}
              >
                {user.name}
              </option>
            ))}
          </select>
          <p>
            {errorInUser}
          </p>
          <p>
            <label htmlFor="search-query">
              Create a new Todo
            </label>

            <p>
              <input
                type="text"
                name="titleOfTodo"
                placeholder="add todo"
                value={titleOfTodo}
                onChange={this.handleChange}
              />
            </p>
          </p>
          <div>
            {errorInTitle}
            {errorOfLength}
          </div>
          <p>
            <button type="submit">Add</button>
          </p>
        </form>
      </div>
    );
  }
}

Form.propTypes = {
  addnewTodo: PropTypes.func.isRequired,
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    }),
  ),
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      length: PropTypes.number.isRequired,
    }),
  ),
};

Form.defaultProps = {
  users: [],
  todos: [],
};
