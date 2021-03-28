import React from 'react';
import './App.css';

import users from './api/users';
import todos from './api/todos';

import { TodoList } from './components/TodoList';
import { AddTodoForm } from './components/AddTodoForm';

function getUserById(userId) {
  return users.find(user => user.id === userId);
}

const preparedTodos = todos.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

class App extends React.Component {
  state = {
    todos: preparedTodos,
  };

  addTodo = (todoName, todoUserId) => {
    this.setState((prevState) => {
      const newTodo = {
        id: todos.length + 1,
        title: todoName,
        userId: todoUserId,
        user: getUserById(+todoUserId),
      };

      return ({
        todos: [...prevState.todos, newTodo],
      });
    });
  };

  render() {
    return (
      <div className="App">
        <h1>Add todo form</h1>

        <AddTodoForm
          users={users}
          onAdd={this.addTodo}
        />

        <TodoList todos={this.state.todos} />
      </div>
    );
  }
}

export default App;
