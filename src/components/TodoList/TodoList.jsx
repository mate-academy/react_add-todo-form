import React, { PureComponent } from 'react';
import { Table } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';

export default class TodoList extends PureComponent {
  render() {
    const todoListWithKey = this.props.todoList.map(todo => ({
      key: uuidv4(),
      ...todo,
    }));

    return (
      <div>
        <h1>Todo List</h1>
        <Table striped bordered hover className="todo__table">
          <thead>
            <tr>
              <th>id</th>
              <th>Name</th>
              <th>Title</th>
            </tr>
          </thead>
          <tbody>
            {todoListWithKey.map(({ id, key, name, title }) => (
              <tr key={key}>
                <td>{id}</td>
                <td>{name}</td>
                <td>{title}</td>
              </tr>
            ))
            }
          </tbody>
        </Table>
      </div>
    );
  }
}

TodoList.propTypes = {
  todoList: PropTypes.func.isRequired,
};
