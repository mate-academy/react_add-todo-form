import React from 'react';
import PropTypes from 'prop-types';

export class Form extends React.Component {
  state = {
    task: '',
    user: '',
    messageError: '',
  }

  addTask = (event) => {
    this.setState({
      task: event.target.value.trim(),
      messageError: '',
    });
  }

  addUser = (event) => {
    this.setState({
      user: event.target.value,
      messageError: '',
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const { task, user } = this.state;

    if (!user) {
      this.setState({ messageError: 'Please choose a user' });
    }

    if (!task) {
      this.setState({ messageError: 'Please add task' });
    }

    if (user && task) {
      const { users, todos } = this.props;

      this.props.addTodo({
        userName: user,
        title: task,
        userId: users.find(usr => usr.id === user),
        completed: false,
        id: todos.length + 1,
      });

      this.setState({
        task: '',
        user: '',
      });
    }
  }

  render() {
    const { users } = this.props;
    const { task, user, messageError } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          name="task"
          value={task}
          onChange={this.addTask}
          placeholders="Add task"
        />

        <select
          name="user"
          value={user}
          onChange={this.addUser}
        >
          <option>
            Choose a user
          </option>
          {users.map(usr => (
            <option
              key={usr.id}
              value={usr.name}
            >
              {usr.name}
            </option>
          ))}
        </select>

        <button type="submit">Add</button>

        <div className="messageError">{messageError}</div>

      </form>
    );
  }
}

Form.propTypes = {
  addTodo: PropTypes.func.isRequired,
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    }).isRequired,
  ).isRequired,
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
};
