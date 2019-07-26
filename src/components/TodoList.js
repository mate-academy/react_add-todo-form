import React from 'react';
import Todo from './Todo';

class TodoList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      todos: [...props.todos],
      sortedTodos: [...props.todos],
      sortBy: 'id',
      reverse: false,
    };
  }

  rerender = () => {
    if (this.state.todos.length !== this.props.todos.length) {
      this.setState({
        todos: [...this.props.todos],
        sortedTodos: [...this.props.todos],
        sortBy: 'id',
        reverse: false,
      });
    }
  }

  handleSort = (field) => {
    let sortList = [];
    let sortCallback;
    let rev = false;

    if (field === this.state.sortBy) {
      sortList = [...this.state.sortedTodos].reverse();
      rev = !this.state.reverse;
    } else {
      switch (field) {
        case 'status':
          sortCallback = (a, b) => a.completed - b.completed;
          break;
        case 'title':
          sortCallback = (a, b) => a.title.localeCompare(b.title);
          break;
        case 'name':
          sortCallback = (a, b) => a.user.name.localeCompare(b.user.name);
          break;
        case 'email':
          sortCallback = (a, b) => a.user.email.localeCompare(b.user.email);
          break;
        default:
          sortCallback = (a, b) => a.id - b.id;
      }

      sortList = [...this.state.todos].sort(sortCallback);
    }

    this.setState(() => (
      {
        sortedTodos: [...sortList],
        sortBy: field,
        reverse: rev,
      }
    ));
  }

  titleResolver = (field) => {
    if (field === this.state.sortBy) {
      return this.state.reverse
        ? field.toUpperCase() + ' ' + String.fromCharCode(8657)
        : field.toUpperCase() + ' ' + String.fromCharCode(8659);
    }

    return field.toUpperCase() + ' ' + String.fromCharCode(8661);
  }

  handleTodoStatusChange = (id) => {
    this.props.handleFunction(id);
  }

  doneCount = () => {
    let count = 0;
    for (let i = 0; i < this.state.sortedTodos.length; i++) {
      if (this.state.sortedTodos[i].completed) {
        count++;
      }
    }
    return count;
  }

  usersCount = () =>
    this.state.sortedTodos.map(todo => todo.user.id)
      .sort((a, b) => a - b)
      .filter((item, index, array) => item !== array[index + 1]).length;

  render() {
    this.rerender();
    return (
      <table>
        <thead>
          <tr>
            <th onClick={() => this.handleSort('status')}>
              {this.titleResolver('status')}
            </th>
            <th onClick={() => this.handleSort('title')}>
              {this.titleResolver('title')}
            </th>
            <th onClick={() => this.handleSort('name')}>
              {this.titleResolver('name')}
            </th>
            <th onClick={() => this.handleSort('email')}>
              {this.titleResolver('email')}
            </th>
          </tr>
        </thead>
        <tbody>
          {this.state.sortedTodos.map(todo => <Todo
            todo={todo}
            key={todo.id}
            handle={this.handleTodoStatusChange}
          /> )}
        </tbody>
        <tfoot>
          <tr>
            <td className="tableFoot">
              Total
            </td>
            <td className="tableFoot">
              Done : {this.doneCount()}
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              UnDone : {this.state.sortedTodos.length - this.doneCount()}
            </td>
            <td className="tableFoot">
              Unique Users : {this.usersCount()}
            </td>
            <td className="tableFoot">
            </td>
          </tr>
        </tfoot>
      </table>
    );
  }
}

export default TodoList;
