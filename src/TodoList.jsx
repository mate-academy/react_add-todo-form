import React from 'react';
import './TodoList.css';
import PropTypes from 'prop-types';

export class TodoList extends React.Component {
  state = {
    todos: this.props.todos,
    todo: '',
    user: '',
    todoError: false,
    userError: false,
  }

  handlerSubmit = (event) => {
    event.preventDefault();
    if (this.state.todo !== '' && this.state.user !== '') {
      this.setState(prev => ({
        todo: '',
        user: '',
        todos: [
          ...prev.todos,
          {
            userId: this.props.users.find(
              user => user.name === prev.user,
            ).id,
            id: prev.todos.length + 1,
            title: prev.todo,
            user: this.props.users.find(user => user.name === prev.user),
          },
        ],
      }));
    }

    if (this.state.todo === '') {
      this.setState({
        todoError: true,
      });
    }

    if (this.state.user === '') {
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
    return (
      <>
        <form onSubmit={this.handlerSubmit} className="form">
          <input
            type="text"
            placeholder="todo"
            name="todo"
            value={this.state.todo}
            onChange={this.handlerChange}
          />

          {this.state.todoError && (
            <span className="errorTitle">Please enter the title</span>
          )}

          <select
            name="user"
            value={this.state.user}
            onChange={this.handlerChange}
          >
            <option />
            {this.props.users.map(
              user => <option key={user.id}>{user.name}</option>,
            )}
          </select>

          {this.state.userError && (
            <span className="errorUser">Please choose a user</span>
          )}

          <button type="submit">Add</button>
        </form>

        <table className="table">
          <thead>
            <tr>
              <th className="th">Id</th>
              <th className="th">Users</th>
              <th className="th">TODOs</th>
            </tr>
          </thead>
          {this.state.todos.map(todo => (
            <tbody key={todo.id}>
              <tr>
                <td className="td td-id">{todo.id}</td>
                <td className="td td-name" key={todo.id}>{todo.user.name}</td>
                <td className="td td-title">{todo.title}</td>
              </tr>
            </tbody>
          ))}
        </table>
      </>
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
