/* eslint-disable max-len */
import React from 'react';
import './App.css';
import todosfromServer from './api/todos';
import usersfromServer from './api/users';
import { TodoList } from './components/TodoList';
import { Form } from './components/Form';

// eslint-disable-next-line react/prefer-stateless-function
export class App extends React.Component {
  state = {
    todos: todosfromServer.map((todo) => {
      const user = usersfromServer.find(person => person.id === todo.userId).name;

      if (typeof (user.id) === 'undefined') {
        return todo;
      }

      return {
        ...todo, name: user,
      };
    }),
    users: usersfromServer,
  }

  addTodo = (newTodo) => {
    this.setState(state => ({
      todos: [...state.todos, newTodo],
    }));
  }

  render() {
    const { todos, users } = this.state;

    return (
      <div className="App">
        <div className="container">
          <div className="header">
            List of TODOs
          </div>
          <div className="wrap-list">
            <TodoList todos={todos} />
            <p className="footer">
              <span>Users: </span>
              {todos.length}
            </p>
          </div>
        </div>
        <div className="container">
          <div className="header">
            Add TODO
          </div>
          <div className="form">
            <Form
              users={users}
              currentTodoID={todos.length}
              addTodo={this.addTodo}
            />
          </div>
        </div>
      </div>
    );
  }
}
