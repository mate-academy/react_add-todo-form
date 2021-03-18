import React from 'react';
import './App.css';
import { TodoList } from './components/TodoList/TodoList';
import { AddTodoForm } from './components/AddTodoForm/AddTodoForm';

import usersFromApi from './api/users';
import todosFromApi from './api/todos';

const preparedTodos = todosFromApi.map(todo => ({
  ...todo,
  user: usersFromApi.find(user => user.id === todo.userId),
}));

class App extends React.Component {
  state = {
    todos: preparedTodos,
  }

  createTodo = (newUser) => {
    const { selectedUser, title } = newUser;

    const newTodo = {
      id: this.state.todos.length + 1,
      title,
      user: selectedUser,
      userId: selectedUser.id,
      completed: false,
    };

    return newTodo;
  }

  addTodo = (todo) => {
    this.setState(prevState => ({
      todos: [...prevState.todos, todo],
    }));
  }

  render() {
    const { todos } = this.state;

    return (
      <div className="App">
        <h1>Add todo form</h1>

        <AddTodoForm
          onCreate={this.createTodo}
          onAdd={this.addTodo}
          users={usersFromApi}
        />

        <TodoList todos={todos} />
      </div>
    );
  }
}

export default App;
