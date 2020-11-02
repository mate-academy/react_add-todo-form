import React from 'react';
import PropTypes from 'prop-types';
import users from '../../api/users';
import { Error } from '../Error';

export class Form extends React.Component {
  state = {
    userName: '',
    newTodo: '',
    errorHidden: true,
  }

  onChange = (event) => {
    const { value, name } = event.target;

    this.setState({
      [name]: value.replace(/[^\w ]/gi, ''),
    });
  }

  addTodo = (event) => {
    const { userName, newTodo } = this.state;
    const { onAdd, todosLength } = this.props;
    let newTodoItem;

    event.preventDefault();

    if (userName !== '' && newTodo !== '') {
      newTodoItem = {
        id: todosLength + 1,
        title: newTodo,
        completed: false,
        user: users.find(person => person.name === userName),
      };
      newTodoItem.userId = newTodoItem.user.id;
      this.setState({
        userName: '',
        newTodo: '',
      });
      onAdd(newTodoItem);
    } else if (userName) {
      this.setState({
        error: 'title',
        errorHidden: false,
      });
    } else {
      this.setState({
        error: 'user',
        errorHidden: false,
      });
    }
  }

  render() {
    const { userName, newTodo, error, errorHidden } = this.state;

    return (
      <form
        className="todo__form"
        onSubmit={this.addTodo}
      >
        <div className="select">
          <select
            name="userName"
            onChange={this.onChange}
            value={userName}
          >
            <option value="">
              Choose name
            </option>
            {users.map(({ name, id }) => (
              <option key={id} value={name}>
                {name}
              </option>
            ))}
          </select>
        </div>
        <input
          type="text"
          name="newTodo"
          onChange={this.onChange}
          value={newTodo}
          placeholder="Enter your task (letters, numbers and space only)"
          className="input todo__input"
        />
        <button
          type="submit"
          className="button is-dark"
        >
          Add task
        </button>
        {errorHidden || <Error type={error} />}
      </form>
    );
  }
}

Form.propTypes = {
  onAdd: PropTypes.func.isRequired,
  todosLength: PropTypes.number.isRequired,
};
