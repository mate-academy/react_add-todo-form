import React from 'react';

import TodoList from './components/TodoList/TodoList';
import NewTodo from './components/NewTodo/NewTodo';
import users from './api/users';
import todos from './api/todos';
import './App.css';

class App extends React.Component {
  state = {
    todos,
    userTodos: [],
  }

  handleChangeTodos = (id) => {
    this.setState(state => ({
      userTodos: state.todos.filter(todo => todo.userId === id),
    }));
  }

  handleSubmitTodo = (newTodo) => {
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

        {<TodoList todos={this.state.userTodos} />}
        {<NewTodo
          todosLength={this.state.todos.length}
          users={users}
          handleChange={this.handleChangeTodos}
          handleSubmit={this.handleSubmitTodo}
        />}
      </div>
    );
  }
}

export default App;
