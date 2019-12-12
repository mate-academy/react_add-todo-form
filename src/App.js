import React from 'react';
import './App.css';
import todos from './api/todos';
import users from './api/users';
import TodoList from './TodoList';
import NewTodo from './NewTodo';

const todosWithUsers = todos.map(todo => ({
  ...todo,
  user: users.find(
    user => user.id === todo.userId
  ),
}));

class App extends React.Component {
  state = { todos: todosWithUsers };

  addTodo = (title, userId) => {
    this.setState((state) => {
      const myTodo = {
        user: users.find(user => user.id === userId),
        id: state.todos.length + 1,
        title,
        completed: false,
      };

      return { todos: [...state.todos, myTodo] };
    });
  };

  render() {
    return (
      <div className="App">
        <h1>Static list of todos</h1>
        <NewTodo addTodo={this.addTodo} />
        <TodoList todos={this.state.todos} />
      </div>
    );
  }
}

export default App;
