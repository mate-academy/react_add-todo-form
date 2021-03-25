import React from 'react';
import PropTypes from 'prop-types';
import { TodoList } from './TodoList';

export class Form extends React.Component {
  state = {
    toDoList: [...this.props.todoList],
    title: null,
    userId: null,
    tryToSend: false,
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { users } = this.props;

    if (!this.state.title || !this.state.userId) {
      this.setState({
        tryToSend: true,
      });

      return;
    }

    this.setState(prevState => ({
      toDoList: [...prevState.toDoList, {
        id: prevState.toDoList.length + 1,
        title: prevState.title,
        user: users.find(user => user.id === prevState.userId),
      }],
      title: null,
      userId: null,
      tryToSend: false,
    }));
  }

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: name === 'userId' ? parseInt(value, 10) : value,
      tryToSend: false,
    });
  }

  render() {
    const { title, userId, tryToSend } = this.state;
    const { users } = this.props;

    return (
      <>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="Enter a title of todo"
            name="title"
            className="form-input"
            value={title || ''}
            onChange={this.handleChange}
          />
          <select
            className="form-select"
            name="userId"
            value={userId || 'Choose a user'}
            onChange={this.handleChange}
          >
            <option value="">
              Choose a user
            </option>
            {
              users.map(user => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
          </select>
          <button type="submit" className="form-button">
            Save new todo
          </button>
        </form>
        <div>
          {
            tryToSend && !title
              && (
              <span className="error-message">
                Please, enter a title of todo...
              </span>
              )
          }
          {
            tryToSend && !userId
              && (
              <span className="error-message">
                Please, select a user...
              </span>
              )
          }
        </div>
        <TodoList todos={this.state.toDoList} />
      </>
    );
  }
}

Form.propTypes = {
  todoList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      user: PropTypes.shape({
        name: PropTypes.string.isRequired,
      }).isRequired,
    }),
  ).isRequired,
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }),
  ).isRequired,
};
