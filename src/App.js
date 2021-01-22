import React from 'react';
import './App.css';

import todos from './api/todos';
import users from './api/users';

import { TodoList } from './components/TodoList';
import { NewTodoForm } from './components/NewTodoForm';

const preparedTodos = todos.map(todo => ({
  ...todo,
  user: users.find(user => user.id === todo.userId),
}));

class App extends React.PureComponent {
  state = {
    todos: preparedTodos,
  };

  addTodo = (user, title) => {
    const newTodo = {
      id: Math.random() * 1000,
      title,
      completed: false,
      user: {
        name: user,
      },
    };

    this.setState(state => ({
      todos: [
        ...state.todos,
        newTodo,
      ],
    }));
  }

  render() {
    return (
      <div className="App">
        <h1>Add todo form</h1>
        <NewTodoForm users={users} onAdd={this.addTodo} />
        <TodoList todos={this.state.todos} />
      </div>
    );
  }
}

export default App;
