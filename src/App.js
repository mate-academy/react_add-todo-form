import React from 'react';
import './App.css';
import todos from './api/todos';
import users from './api/users';
import NewTodo from './NewTodo';
import TodoList from './TodoList';

class App extends React.Component {
  state = {
    todos,
  }

  addTodo = (user, title) => {
    this.setState((state) => {
      const newTodo = {
        userId: user,
        id: state.todos.length + 1,
        title,
        completed: false,
      };

      return {
        todos: [...state.todos, newTodo],
      };
    });
  }

  render() {
    return (
      <div className="App">
        <h1>Static list of todos</h1>
        <NewTodo
          addTodo={this.addTodo}
          users={users}
        />
        <TodoList
          todos={this.state.todos}
          users={users}
        />
      </div>
    );
  }
}

export default App;
