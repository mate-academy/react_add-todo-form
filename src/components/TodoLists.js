import React from 'react';
import PropTypes from 'prop-types';
import { NewTodo } from './NewTodo';
import { Todo } from './Todo';

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
        <NewTodo todos={this.state.todos} addTodo={this.addTodo} />
      </>
    );
  }
}

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    userId: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  })).isRequired,
  users: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    address: PropTypes.shape({
      street: PropTypes.string.isRequired,
      suite: PropTypes.string.isRequired,
      city: PropTypes.string.isRequired,
      zipcode: PropTypes.string.isRequired,
      geo: PropTypes.shape({
        lat: PropTypes.string.isRequired,
        lng: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
    phone: PropTypes.string.isRequired,
    website: PropTypes.string.isRequired,
    company: PropTypes.shape({
      name: PropTypes.string.isRequired,
      catchPhrase: PropTypes.string.isRequired,
      bs: PropTypes.string.isRequired,
    }).isRequired,
  })).isRequired,
};
