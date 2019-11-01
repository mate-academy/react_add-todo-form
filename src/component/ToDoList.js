import React, { Component } from 'react';
import TableRow from '../component/TableRow/TableRow';

export default class ToDoList extends Component {
  render() {
    const { users, todos } = this.props;

    return (
    <table className="col-sm-12 ui table  inverted">
      <thead>
        <tr>
          <th>ToDo Item</th>
          <th>User</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {todos.map(todo => <TableRow users={users} todo={todo} key={todo.id}/>)}
      </tbody>
    </table>
    );
  }
}
