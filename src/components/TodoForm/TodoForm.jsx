import React from 'react';
import PropTypes from 'prop-types';
import { TodoList } from '../TodoList';

import './TodoForm.scss';

let count = 2;

export class TodoForm extends React.Component {
  state = {
    title: '',
    name: '',
    errorText: '',
    errorSelect: '',
    tasks: this.props.todos,
  };

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  }

  validate = () => {
    let errorText = '';
    let errorSelect = '';

    if (!this.state.title) {
      errorText = 'Please enter the title';
    }

    if (!this.state.name) {
      errorSelect = 'Please choose a user';
    }

    if (errorText || errorSelect) {
      this.setState({
        errorText, errorSelect,
      });

      return false;
    }

    return true;
  }

  addTodo = (event) => {
    event.preventDefault();
    const isValid = this.validate();

    if (isValid) {
      count += 1;
      this.setState(prevState => ({
        title: '',
        name: '',
        errorText: '',
        errorSelect: '',
        tasks: [
          ...prevState.tasks,
          {
            title: prevState.title,
            id: count,
            completed: false,
            user: {
              name: prevState.name,
            },
          },
        ],
      }));
    }
  }

  render() {
    const { users } = this.props;
    const { tasks } = this.state;

    return (
      <>
        <form
          className="form"
          onSubmit={this.addTodo}
        >
          <label htmlFor="name">
            <input
              type="text"
              id="name"
              name="title"
              className="form__input"
              placeholder="Enter todo"
              value={this.state.title}
              onChange={this.handleChange}
            />
          </label>
          <p className="form__error">
            {this.state.errorText}
          </p>

          <select
            name="name"
            className="form__select-user"
            value={this.state.name}
            onChange={this.handleChange}
          >
            <option value="">Select user</option>
            {users.map(user => (
              <option key={user.id}>
                {user.name}
              </option>
            ))}
          </select>
          <p className="form__error">
            {this.state.errorSelect}
          </p>

          <button
            type="submit"
            className="form__add-button"
          >
            Add
          </button>
        </form>
        <TodoList tasks={tasks} />
      </>
    );
  }
}

TodoForm.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
  users: PropTypes.arrayOf(PropTypes.object).isRequired,
};
