import React from 'react';

import TodoList from './components/TodoList/TodoList';
import NewTodo from './components/NewTodo/NewTodo';
import users from './api/users';
import todos from './api/todos';
import './App.css';

class App extends React.Component {
  state = {
    todos,
  }

  addNewTodo = (newTodo) => {
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
        <h1 className="App__header">Add todo form</h1>

        <p className="App__text">
          <span className="App__span">Users: </span>
          {users.length}
        </p>

        <TodoList todos={this.state.todos} />
        <NewTodo
          todosLength={this.state.todos.length}
          users={users}
          addNewTodo={this.addNewTodo}
        />
      </div>
    );
  }
}

export default App;
