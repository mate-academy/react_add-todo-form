import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table } from '../../node_modules/react-bootstrap';
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
        <Table
          striped
          bordered
          hover
          variant="dark"
          size="sm"
          responsive="sm"
        >
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
        </Table>
        <NewTodo users={users} addNewTodo={this.addNewTodo} />
      </>
    );
  }
}

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    userId: PropTypes.number,
    id: PropTypes.number,
    title: PropTypes.string,
    completed: PropTypes.bool,
  })).isRequired,
  users: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
  })).isRequired,
};
