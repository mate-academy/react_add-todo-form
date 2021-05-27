import React from 'react';
import './App.css';
import AddTodoForm from './components/AddTodoForm/AddTodoForm';
import TodoList from './components/TodoList/TodoList';

import users from './api/users';
import todos from './api/todos';

const getUserById = userId => users.find(user => user.id === userId);

const preparedTodos = todos.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

class App extends React.Component {
  state = {
    todos: preparedTodos,
  };

  addTodo = (todoName, userId) => {
    const newTodo = {
      id: Math.random(),
      title: todoName,
      userId,
      completed: false,
      user: getUserById(userId),
    };

    this.setState(state => ({
      todos: [...state.todos, newTodo],
    }));
  }

  render() {
    // eslint-disable-next-line
    const { todos } = this.state;

    return (
      <div className="App">
        <AddTodoForm onAdd={this.addTodo} />
        <TodoList todos={todos} />
      </div>
    );
  }
}

export default App;
