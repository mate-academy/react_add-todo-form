import React from 'react';
import PropTypes from 'prop-types';
import { NewTodo } from './NewTodo';
import Todo from './Todo';
import users from '../api/users';
import { todosShape, usersShape } from '../shapes';

export class TodoList extends React.Component {
  state = {
    users: this.props.users,
    todos: this.props.todos,
  }

  addTodo = (info) => {
    this.setState(prev => ({
      todos: [...prev.todos, { ...info }],
    }));
  }

  render() {
    return (
      <>
        <ul>
          {this.state.todos.map(todo => (
            <li key={todo.id}>
              <Todo
                title={todo.title}
                completed={todo.completed}
                username={
                  this.state.users.find(user => user.id === todo.userId).name
                }
              />
            </li>
          ))}
        </ul>
        <NewTodo
          users={users}
          todos={this.state.todos}
          addTodo={this.addTodo}
        />
      </>
    );
  }
}

TodoList.propTypes = {
  todos: PropTypes.arrayOf(todosShape).isRequired,
  users: PropTypes.arrayOf(usersShape).isRequired,
};
