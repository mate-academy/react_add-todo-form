import React from 'react';
import PropTypes from 'prop-types';
import { Todo } from '../Todo';

import './TodoList.css';

export class TodoList extends React.Component {
  state = {
    todos: [...this.props.todos],
    users: [...this.props.users],
    todo: '',
    user: '',
    todoError: false,
    userError: false,
  }

  addTodo = (event) => {
    const { todo, user, users } = this.state;

    event.preventDefault();
    if (todo.length > 0 && user.length > 0) {
      this.setState(prev => ({
        todo: '',
        user: '',
        todos: [
          ...prev.todos,
          {
            userId: users.find(
              person => person.name === prev.user,
            ).id,
            id: prev.todos.length + 1,
            title: prev.todo,
            user: users.find(persone => persone.name === prev.user),
          },
        ],
      }));
    }

    if (todo.length <= 0 || todo.length > 30) {
      this.setState({
        todoError: true,
      });
    }

    if (user === '') {
      this.setState({
        userError: true,
      });
    }
  }

  handlerChange = (event) => {
    const { value, name } = event.target;

    this.setState({
      [name]: value,
      todoError: false,
      userError: false,
    });
  }

  render() {
    const { todo, todos, todoError, userError, user, users } = this.state;

    return (
      <div>
        <form onSubmit={this.addTodo} className="form">
          <input
            className="form-input"
            type="text"
            placeholder="Enter todo title"
            name="todo"
            value={todo}
            onChange={this.handlerChange}
          />

          {todoError && (
            <span className="error">Enter the title(max length 30)</span>
          )}

          <select
            name="user"
            value={user}
            onChange={this.handlerChange}
          >
            <option disabled value="">Select user name</option>
            {users.map(
              person => <option key={person.id}>{person.name}</option>,
            )}
          </select>

          {userError && (
            <span className="error">Please choose a user</span>
          )}

          <button type="submit" className="add-btn">Add</button>
        </form>

        <ul className="todo-list">
          {todos.map(todoCard => (
            <li className="todo-list-item" key={todoCard.id}>
              <Todo {...todoCard} />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape().isRequired,
  ).isRequired,
  users: PropTypes.arrayOf(
    PropTypes.shape().isRequired,
  ).isRequired,
};
