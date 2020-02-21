import React from 'react';
import PropTypes from 'prop-types';
import { NewTodo } from '../NewTodo/NewTodo';

export class TodoList extends React.Component {
  state = {
    users: this.props.users,
    todos: this.props.todos,
  }

  addTodo = (todo) => {
    this.setState(prevState => ({
      todos: [...prevState.todos, todo],
    }));
  }

  render() {
    return (
      <>
        <NewTodo users={this.state.users} addTodo={this.addTodo} />
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Title</th>
              <th>User Id</th>
            </tr>
          </thead>
          {this.state.todos.map(todo => (
            <tr>
              <td>{todo.id}</td>
              <td>{todo.title}</td>
              <td>{todo.userId}</td>
            </tr>
          ))}
        </table>
      </>
    );
  }
}

TodoList.propTypes = {
  users: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
  })).isRequired,
  todos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    userId: PropTypes.number,
  })).isRequired,
};
