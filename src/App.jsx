import React from 'react';
import './App.css';

import users from './api/users';
import todosFromApi from './api/todos';
import { TodoList } from './components/TodoList';
import { TodoForm } from './components/TodoForm/TodoForm';

const preparedTodos = todosFromApi.map(todo => ({
  ...todo,
  userName: users.find(user => (todo.userId === user.id)).name,
}));

class App extends React.Component {
  state = {
    todos: preparedTodos,
  }

  addTodo = (title, selectedUser) => {
    this.setState((state) => {
      const newTodo = {
        userId: selectedUser.id,
        id: state.todos.length + 1,
        title,
        completed: false,
        userName: selectedUser.name,
      };

      return {
        todos: [...state.todos, newTodo],
      };
    });
  }

  render() {
    return (
      <div className="app">
        <h1 className="app__title">Add todo form</h1>

        <div className="app__todos">
          <TodoList todos={preparedTodos} />

          <TodoForm users={users} addTodo={this.addTodo} />
        </div>
      </div>
    );
  }
}

export default App;
