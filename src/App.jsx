import React from 'react';
import './App.css';

import users from './api/users';
import todosFromApi from './api/todos';
import { TodoList } from './components/TodoList';
import { TodoForm } from './components/TodoForm/TodoForm';

const preparedTodos = todosFromApi.map(todo => ({
  ...todo,
  user: users.find(user => (todo.userId === user.id)).id,
}));

class App extends React.Component {
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
          <TodoList todos={this.state.todos} />

          <TodoForm users={users} addTodo={this.addTodo} />
        </div>
      </div>
    );
  }
}

export default App;
