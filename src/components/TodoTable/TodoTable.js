import React, { Component } from 'react';
import './TodoTable.css';
import TodoForm from '../TodoForm/TodoForm';

class TodoTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todos: [],
      users: [],
    };
  }

  getDatas = (todos, users) => {
    this.setState({
      todos,
      users,
    });
  }

  render() {
    return (
      <section className="todo">
        <TodoForm getDatas={this.getDatas} />
        <table className="todo__table table">
          <tr className="table__row">
            <th className="table__cell table__cell_upper">Id</th>
            <th className="table__cell table__cell_upper">Title</th>
            <th className="table__cell table__cell_upper">User</th>
          </tr>
          <tbody className="table__main">
            {this.state.todos.map((todo) => {
              const requiredUser = this.state.users.find(user => user.id === todo.userId);

              return (
                <tr className="table__row">
                  <td className="table__cell">{todo.id}</td>
                  <td className="table__cell">{todo.title}</td>
                  <td className="table__cell">{requiredUser.name}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>
    );
  }
}

export default TodoTable;
