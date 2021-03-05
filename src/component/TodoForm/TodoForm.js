import React from 'react';
import PropTypes from 'prop-types';
import './TodoForm.css';
import { TodoList } from '../TodoList';
import { ErrorMessage } from '../ErrorMessage';

export class TodoForm extends React.Component {
  state = {
    todos: this.props.todos,
    userId: 0,
    selectValue: 'Choose a user',
    inputValue: '',
    errors: '',
  }

  select = (event) => {
    const { value } = event.target;
    const { users } = this.props;

    this.setState({
      userId: !value.includes('Choose a user')
        ? users.find(user => user.name === value).id
        : 0,
      selectValue: value,
      errors: '',
    });
  }

  changeValue = (event) => {
    const { value } = event.target;

    this.setState({
      inputValue: value,
      errors: '',
    });
  }

  addTodo = (event) => {
    event.preventDefault();

    this.setState((state) => {
      const newTodo = {
        userId: state.userId,
        id: state.todos.length + 1,
        title: state.inputValue,
        completed: false,
        hidden: false,
        user: this.props.users.find(user => user.id === state.userId),
      };

      if (this.validateForm()) {
        return ({
          errors: this.validateForm(),
        });
      }

      return ({
        todos: [...state.todos].concat(newTodo),
        inputValue: '',
      });
    });
  }

  status = (event) => {
    const { checked, id } = event.target;

    this.setState(state => ({
      todos: [...state.todos].map((todo) => {
        const currentTodo = todo;

        if (todo.id === +id) {
          currentTodo.completed = checked;
        }

        return ({
          ...currentTodo,
        });
      }),
    }));
  }

  validateForm() {
    const { selectValue, inputValue } = this.state;

    let message;

    if (selectValue === 'Choose a user') {
      message = 'not specified user';
    } else if (!inputValue.length) {
      message = 'not specified todo';
    } else if (inputValue.length < 10) {
      message = 'to short todo';
    }

    return message;
  }

  render() {
    return (
      <>
        <div className="TodoForm">
          <label htmlFor="select">
            <select
              id="select"
              value={this.state.selectValue}
              onChange={this.select}
            >
              <option>Choose a user</option>
              {[...this.props.users].map(user => (
                <option key={user.id}>{user.name}</option>
              ))}
            </select>
          </label>

          <label htmlFor="input">
            <input
              id="input"
              type="text"
              placeholder="Add new Todo"
              value={this.state.inputValue}
              onChange={this.changeValue}
            />
          </label>

          <label htmlFor="button">
            <button
              id="button"
              type="submit"
              onClick={this.addTodo}
            >
              Add
            </button>
          </label>
        </div>

        <ErrorMessage {...this.state} />
        <TodoList {...this.state} status={this.status} />
      </>
    );
  }
}

TodoForm.propTypes = {
  users: PropTypes.arrayOf(PropTypes.object).isRequired,
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
};
