import React from 'react';
import PropTypes from 'prop-types';
import './AddTodo.css';

export class AddTodo extends React.Component {
  state = {
    userId: 0,
    title: '',
    idError: false,
    titleError: false,
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { newTodoId, users, addTodo } = this.props;
    const { userId, title } = this.state;

    if (!userId) {
      this.setState({
        idError: true,
      });
    }

    if (!title) {
      this.setState({
        titleError: true,
      });
    }

    if (!title || !userId) {
      return;
    }

    addTodo({
      userId,
      id: newTodoId,
      title,
      completed: false,
      user: users.find(user => user.id === userId),
    });

    this.setState({
      title: '',
      userId: 0,
    });
  }

  render() {
    const { users } = this.props;
    const { title, userId, titleError, idError } = this.state;

    return (
      <form
        className="addTodo"
        onSubmit={this.handleSubmit}
      >
        <label htmlFor="title">Title </label>
        <input
          className="addTodo__input"
          type="text"
          name="title"
          id="title"
          value={title}
          onChange={(event) => {
            this.setState({
              title: event.target.value.trim(),
              titleError: false,
            });
          }
          }
        />
        {
          titleError && (
            <span className="addTodo__error">Please enter the message</span>
          )
        }
        <select
          className="addTodo__input"
          value={userId}
          onChange={(event) => {
            this.setState({
              userId: +event.target.value,
              idError: false,
            });
          }}
        >
          <option>Choose a user</option>
          {users.map(user => (
            <option
              key={user.id}
              value={user.id}
            >
              {user.name}
            </option>
          ))
          }

        </select>
        {
          idError && (
            <span className="addTodo__error">Please choose user</span>
          )
        }

        <button type="submit">Add todo</button>
      </form>
    );
  }
}

AddTodo.propTypes = {
  newTodoId: PropTypes.number.isRequired,
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    }),
  ).isRequired,
  addTodo: PropTypes.func.isRequired,
};
