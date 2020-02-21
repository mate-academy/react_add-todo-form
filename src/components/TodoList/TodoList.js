import React from 'react';
import PropTypes from 'prop-types';
import { NewTodo } from '../NewTodo/NewTodo';
import './TodoList.css';

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
        <table className="table">
          <thead>
            <tr className="table__head">
              <th>Id</th>
              <th>Title</th>
              <th>User Id</th>
            </tr>
          </thead>
          {this.state.todos.map(todo => (
            <tr className="table__row">
              <td className="table__cell">{todo.id}</td>
              <td className="table__cell">{todo.title}</td>
              <td className="table__cell">{todo.userId}</td>
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
