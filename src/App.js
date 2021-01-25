import React from 'react';
import './App.css';

import todos from './api/todos';
import users from './api/users';
import { TodoList } from './components/TodoList/TodoList';
import { TodoForm } from './components/TodoForm/TodoForm';

const preparedTodos = todos.map(todo => ({
  ...todo,
  user: users.find(({ id }) => id === todo.userId),
}));

class App extends React.PureComponent {
  state = {
    todos: preparedTodos,
  }

  addTodo = (title, user) => {
    this.setState((state) => {
      const newToDo = {
        title,
        user,
        userId: user.id,
        id: state.todos.length + 1,
        completed: false,
      };

      return {
        todos: [
          ...state.todos,
          newToDo,
        ],
      };
    });
  }

  render() {
    return (
      <main className="app">
        <TodoForm users={users} addTodo={this.addTodo} />
        <TodoList todos={this.state.todos} />
      </main>
    );
  }
}

export default App;
