import React from 'react';

import './App.scss';

import todos from './api/todos';
import users from './api/users';

import { TodoList } from './components/TodoList';
import { AddTodoForm } from './components/AddTodoForm';

const preparedTodos = todos.map(todo => ({
  ...todo,
  user: users.find(user => user.id === todo.userId),
}));

class App extends React.Component {
  state = {
    todos: [...preparedTodos],
  };

  addTodo = (todoName, userId) => {
    const todoSortDown = [...this.state.todos]
      .sort((a, b) => b.id - a.id);

    const newTodo = {
      id: todoSortDown[0].id + 1,
      title: todoName,
      userId,
      completed: false,
      user: users.find(user => user.id === userId),
    };

    this.setState(state => ({
      todos: [...state.todos, newTodo],
    }));
  }

  render() {
    const revTodos = [...this.state.todos].reverse();

    return (
      <div>
        <h1 className="title">Add todo form</h1>

        <AddTodoForm onAdd={this.addTodo} />
        <TodoList todos={revTodos} />
      </div>
    );
  }
}

export default App;
