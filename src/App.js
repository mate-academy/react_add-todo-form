import React, { PureComponent } from 'react';
import './App.css';

import users from './api/users';
import todos from './api/todos';
import TodoList from './components/TodoList';
import { AddTodoForm } from './components/AddTodoForm';

const preparedTodos = todos.map(todo => ({
  ...todo,
  user: users.find(user => user.id === todo.userId),
}));

class App extends PureComponent {
  state = {
    todos: preparedTodos,
  }

  addTodo = (title, user) => {
    this.setState((state) => {
      const newTodo = {
        userId: user.id,
        id: state.todos.length + 1,
        title,
        completed: false,
        user,
      };

      return { todos: [...state.todos, newTodo] };
    });
  }

  render() {
    return (
      <div className="App">
        <h1 style={{ textAlign: 'center' }}>LIST OF TODOS</h1>
        <AddTodoForm
          users={users}
          addTodo={this.addTodo}
        />
        <table className="ui celled table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Title</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <TodoList
              todosList={this.state.todos}
            />
          </tbody>
        </table>
      </div>
    );
  }
}

App.propTypes = {};

export default App;
