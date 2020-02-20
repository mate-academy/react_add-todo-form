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
        <table className="table">
          <thead>
            <tr className="table__title">
              <th className="table__cell">№</th>
              <th className="table__cell">Task</th>
              <th className="table__cell">User id</th>
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
    PropTypes.shape({
      userId: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
      completed: PropTypes.bull.isRequired,
    }).isRequired,
  ).isRequired,
  users: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
      username: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
};
