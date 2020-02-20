import React from 'react';
import PropTypes from 'prop-types';

import { NewTodo } from './NewTodo';
import { Todo } from './Todo';

export class TodoList extends React.Component {
  state = {
    todos: this.props.todos,
    users: this.props.users,
  }

  addTodo = (newTodo) => {
    this.setState(prevState => ({
      todos: [
        ...prevState.todos,
        newTodo,
      ],
    }));
  }

  render() {
    const { todos, users } = this.state;

    return (
      <>
        <NewTodo
          addTodo={this.addTodo}
          users={users}
        />
        <table className="todol-list__todos">
          <thead className="todol-list__thead">
            <tr>
              <th>id</th>
              <th>todo</th>
              <th>name</th>
            </tr>
          </thead>
          <tbody>
            {todos.map(todo => (
              <Todo
                todo={todo}
                key={todo.title}
                user={users.find(user => user.id === todo.userId)}
              />
            ))}
          </tbody>
        </table>
      </>
    );
  }
}

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      userId: PropTypes.number,
      title: PropTypes.string,
      id: PropTypes.number,
    }).isRequired,
  ).isRequired,
  users: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      id: PropTypes.number,
      username: PropTypes.string,
    }).isRequired,
  ).isRequired,
};
