import React from 'react';
import PropTypes from 'prop-types';

import './TodoList.css';

import { Todo } from '../Todo/Todo';
import { NewTodo } from '../NewTodo/NewTodo';

export class TodoList extends React.Component {
  state = {
    todos: this.props.todos,
    users: this.props.users,
  }

  addTodo = (todo) => {
    this.setState(prevState => ({
      todos: [
        ...prevState.todos,
        todo,
      ],
    }));
  }

  render() {
    const { todos, users } = this.state;

    return (
      <>
        <table className="tableWrapper">
          <thead>
            <tr className="tableTitle">
              <th className="tableCell">№</th>
              <th className="tableCell">Task</th>
              <th className="tableCell">User id</th>
            </tr>
          </thead>
          <tbody>
            {todos.map(todo => <Todo key={todo.title} todo={todo} />)}
          </tbody>
        </table>
        <NewTodo
          addTodo={this.addTodo}
          users={users}
        />
      </>
    );
  }
}

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.object.isRequired,
  ).isRequired,
  users: PropTypes.arrayOf(
    PropTypes.object.isRequired,
  ).isRequired,
};
