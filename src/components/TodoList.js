import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NewTodo } from './NewTodo';

export class TodoList extends Component {
  state = {
    todos: this.props.todos,
    users: this.props.users,
  }

  addNewTodo = (todo) => {
    this.setState(prevState => ({
      todos: [...prevState.todos, todo],
    }));
  }

  render() {
    const { todos, users } = this.state;

    return (
      <>
        <table className="todo-list">
          <thead>
            <tr>
              <th>№</th>
              <th>Title TODO</th>
              <th>userId</th>
            </tr>
          </thead>
          <tbody>
            {todos.map(todo => (
              <tr key={todo.id}>
                <td>{todo.id}</td>
                <td>{todo.title}</td>
                <td>{todo.userId}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <NewTodo users={users} addNewTodo={this.addNewTodo} />
      </>
    );
  }
}

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  users: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};
