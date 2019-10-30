import React, { Component } from 'react';

export default class TableRow extends Component {

  render() {
    const { users, todo } = this.props;

    return (
      <tr>
        <td>{todo.title}</td>
        <td>{users.find(user => user.id === todo.userId).name}</td>
        <td>
          {todo.completed ?
          (<span><i className="green checkmark icon"></i>Completed</span>)
          : (<span className="d-inline-block"><i className="red close window icon float-left"></i>Not completed</span>)}
        </td>
      </tr>
    );
  }
}
