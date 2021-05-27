import React from 'react';
import './App.scss';

import todos from './api/todos';
import users from './api/users';

import { TodoList } from './components/TodoList/TodoList';

import { AddTodoForm } from './components/AddTodoForm/AddTodoForm';

const getUserById = userId => users.find(user => user.id === userId);

const preparedTodos = todos.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

class App extends React.Component {
  state = {
    todos: preparedTodos,
  }

  addTodo = (todoName, todoUserId) => {
    const newTodo = {
      id: Math.random(),
      title: todoName,
      userId: todoUserId,
      user: getUserById(+todoUserId),
    };

    this.setState(state => ({
      todos: [newTodo, ...state.todos],
    }));
  };

  render() {
    return (
      <div className="App">
        <h1>Add todo form</h1>

        <AddTodoForm onAdd={this.addTodo} />

        <TodoList todos={this.state.todos} />
      </div>
    );
  }
}

export default App;
