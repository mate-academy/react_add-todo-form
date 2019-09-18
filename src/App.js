import React from 'react';
import './App.css';

import users from './api/users';
import todos from './api/todos';

import TodoList from './components/TodoList/TodoList';
import NewTodo from './components/NewTodo/NewTodo';

const preparedTodos = todos.map(todo => ({
  ...todo,
  user: users.find(user => user.id === todo.userId),
}));

class App extends React.Component {
  state = {
    todos: [...preparedTodos],
  }

  addTodo = (todo) => {
    this.setState(prevState => ({
      todos: [...prevState.todos, {
        title: todo.title,
        id: prevState.todos.length + 1,
        completed: false,
        userId: Number(todo.userId),
      }].map(currentTodo => ({
        ...currentTodo,
        user: users.find(user => user.id === currentTodo.userId),
      })),
    }));
  }

  render() {
    return (
      <div className="app">
        <h1>Add todo form</h1>
        <NewTodo addTodo={this.addTodo} />
        <TodoList preparedTodos={this.state.todos} />
      </div>
    );
  }
}

export default App;
