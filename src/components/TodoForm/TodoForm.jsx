import React from 'react';
import './TodoForm.css';
import PropTypes from 'prop-types';

export class TodoForm extends React.Component {
  state = {
    todo: '',
    userId: 0,
    todoError: false,
    userIdError: false,
  }

  onSubmitHandler = (event) => {
    event.preventDefault();

    this.setState(({ todo, userId }) => ({
      todoError: !todo,
      userIdError: !userId,
    }));

    const { userId, todo } = this.state;

    if (!userId) {
      return;
    }

    if (!todo) {
      return;
    }

    this.props.addTodo(this.state.todo, +this.state.userId);
    this.setState(
      {
        todo: '',
        userId: 0,
      },
    );
  }

  todoHandler = (event) => {
    this.setState({
      todoError: !event.target.value,
      todo: event.target.value,
    });
  }

  userIdHandler = (event) => {
    this.setState({
      userIdError: !event.target.value,
      userId: event.target.value,
    });
  }

  render() {
    const { users } = this.props;
    const { todoError, userIdError } = this.state;

    return (
      <form onSubmit={this.onSubmitHandler}>
        <input
          className="Todo_input"
          value={this.state.todo}
          onChange={this.todoHandler}
        />
        {todoError && <span className="warning"> Please input Todo</span>}
        <select
          value={this.state.userId}
          onChange={this.userIdHandler}
        >
          <option>select user</option>
          {users.map(({ id, name }) => (
            <option key={id} value={id}>{name}</option>
          ))}
        </select>
        {userIdError && <span className="warning"> Please select user</span>}
        <br />
        <button type="submit">Add Todo</button>
      </form>
    );
  }
}

TodoForm.propTypes = {
  users: PropTypes.arrayOf(PropTypes.shape(
    { name: PropTypes.string.isRequired },
  )).isRequired,
  addTodo: PropTypes.func.isRequired,
};
