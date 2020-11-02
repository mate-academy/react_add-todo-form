import React, { Component } from 'react';
import './Form.css';

import PropTypes from 'prop-types';

export class Form extends Component {
  state = {
    todoTitle: '',
    userId: '',
    titleError: '',
    userError: '',
    tooLongError: '',
  }

  validate = () => {
    this.setState((state) => {
      if (state.userId) {
        this.setState({
          userError: '',
        });
      }

      if (state.todoTitle) {
        this.setState({
          titleError: '',
        });
      }

      if (state.todoTitle.length <= 50) {
        this.setState({
          tooLongError: '',
        });
      }
    });
  }

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
    this.validate();
  };

  submitionEvent = (event) => {
    event.preventDefault();

    const {
      todoTitle,
      userId,
    } = this.state;

    const {
      addnewTodo,
      users,
    } = this.props;

    if (!userId) {
      this.setState({
        userError: 'Please choose a user!',
      });
    } else if (!todoTitle) {
      this.setState({
        titleError: 'Please enter the title!',
      });
    } else if (todoTitle.length > 50) {
      this.setState({
        tooLongError:
        'Input less then 50 symbols!',
      });
    } else {
      const newTodo = {
        userId: users.find(user => user.name === userId).id,
        id: new Date(),
        title: todoTitle,
        completed: false,
      };

      addnewTodo(newTodo);
      this.setState({
        todoTitle: '',
        userId: '',
        titleError: '',
        userError: '',
        tooLongError: '',
      });
    }
  }

  render() {
    const {
      todoTitle,
      userId,
      titleError,
      userError,
      tooLongError,
    } = this.state;
    const { users } = this.props;

    return (
      <div className="Form">
        <h3
          className="header"
        >
          Input form
        </h3>
        <form onSubmit={this.submitionEvent}>
          <label
            className="field"
            htmlFor="userId"
          >
            Select user who has to complete the task
          </label>
          <br />
          <select
            className="field"
            name="userId"
            value={userId}
            onChange={this.handleChange}
          >
            <option value="">
              Select
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
            <p className="field">
              <label htmlFor="todoTitle">
                Name a todo
              </label>
              <br />
              <input
                type="text"
                name="todoTitle"
                label="todo name"
                value={todoTitle}
                onChange={this.handleChange}
              />

            </p>
          </p>
          <div>
            <span className="field error">
              {titleError}
              {tooLongError}
              {userError}
            </span>
          </div>
          <p
            className="button"
          >
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
};

Form.defaultProps = {
  users: [],
  todos: [],
};
