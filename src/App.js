import React from 'react';
import './App.css';

import todos from './api/todos';
import users from './api/users';
import { TodoList } from './components/TodoList/TodoList';
import { AddTodoForm } from './components/AddTodoForm/AddTodoForm';

const preparedTodos = todos.map(todo => ({
  ...todo,
  user: users.find(user => user.id === todo.userId),
}));

class App extends React.Component {
  state = {
    allTodos: preparedTodos,
  }

  addTodo = (todoTitle, userId) => {
    const { allTodos } = this.state;

    const newTodo = {
      user: users.find(user => user.id === userId),
      id: allTodos[allTodos.length - 1].id + 1,
      title: todoTitle,
      completed: false,
    };

    this.setState(state => ({
      allTodos: [...state.allTodos, newTodo],
    }));
  }

  render() {
    const { allTodos } = this.state;

    return (
      <div className="App">
        <AddTodoForm addTodo={this.addTodo} />
        <TodoList todos={allTodos} />
      </div>
    );
  }
}

export default App;
