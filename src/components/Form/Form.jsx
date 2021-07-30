import React from 'react';
import PropTypes from 'prop-types';
import { usersType } from '../../types';

export class Form extends React.Component {
  state = {
    enteredTodo: '',
    name: '',
    userId: 0,
    completed: false,
  }

  onChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
  }

  findUser = (userName) => {
    if (this.state.name === '') {
      return 0;
    }

    return this.props.users.find(user => user.name === userName).id;
  }

  cleanState = () => {
    this.setState({
      completed: false,
      enteredTodo: '',
      name: '',
    });
  }

  addTodoAfterSubmit = (event) => {
    const createTodo = {
      userId: this.state.userId,
      title: this.state.enteredTodo,
      completed: this.state.completed,
    };

    event.preventDefault();

    if (this.state.name === '') {
      return;
    }

    this.props.addTodo(createTodo);
    this.cleanState();
  }

  getUserId = () => {
    this.setState(prevState => ({
      userId: this.findUser(prevState.name),
    }));
  }

  render() {
    const { getUserId, addTodoAfterSubmit, onChange } = this;
    const { enteredTodo, name } = this.state;
    const { users } = this.props;

    return (
      <form
        action="post"
        onSubmit={addTodoAfterSubmit}
      >
        <select
          name="name"
          value={name}
          onChange={onChange}
        >
          <option>Choose User</option>
          {users.map(user => (
            <option id={user.id} value={user.name} key={user.name}>
              {user.name}
            </option>
          ))}
        </select>

        <input
          type="text"
          name="enteredTodo"
          placeholder="Title"
          value={enteredTodo}
          onChange={this.onChange}
          required
        />

        <button
          type="submit"
          onClick={getUserId}
        >
          Add task
        </button>
      </form>
    );
  }
}

Form.propTypes = {
  users: PropTypes.arrayOf(usersType).isRequired,
  addTodo: PropTypes.func.isRequired,
};
