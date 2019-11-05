import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';
import TableRow from "./TableRow";

class TodoList extends Component {
  render() {
    const { users, todos } = this.props;
    return (
      <Table celled selectable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>ToDoItem</Table.HeaderCell>
            <Table.HeaderCell>User</Table.HeaderCell>
            <Table.HeaderCell>Status</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {todos.map(todo => <TableRow users={users} todo={todo} key={todo.id} />)}
        </Table.Body>
      </Table>
    );
  }
}

export default TodoList;
