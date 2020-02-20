import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Todo } from '../Todo/Todo';
import { NewTodo } from '../NewTodo/NewTodo';
import './TodoList.css';

export class TodoList extends Component {
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
          <thead className="table__header">
            <tr>
              <td className="table__data">ID</td>
              <td className="table__data">Todo</td>
              <td className="table__data">User name</td>
            </tr>
          </thead>
          <tbody className="table__body">
            {todos.map(todo => (
              <Todo
                currentTodo={todo}
                person={users.find(
                  user => user.id === todo.userId,
                )}
                key={todo.id}
              />
            ))}
          </tbody>
        </table>
        <NewTodo
          addTodo={this.addTodo}
          todosLength={todos.length}
          users={users}
        />
      </>
    );
  }
}

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    userId: PropTypes.number,
    id: PropTypes.number,
    title: PropTypes.string,
  })).isRequired,
  users: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
  })).isRequired,
};
