import React from 'react';
import Menu from './components/Menu/Menu';
import TodoList from './components/TodoList/TodoList';
import './App.css';

import users from './api/users';
import todos from './api/todos';

const preparedTodos = todos.map(todo => ({
  ...todo,
  user: users.find(user => user.id === todo.userId),
}));

class App extends React.Component {
  state = {
    todos: [...preparedTodos],
  }

  createTodo = (newTodo) => {
    this.setState(prevState => ({
      todos: [
        ...prevState.todos,
        newTodo,
      ],
    }));
  }

  render() {
    return (
      <div className="App">
        <h1>Add todo form</h1>

        <p>
          <span>Users: </span>
          {users.length}
        </p>
        <Menu
          users={users}
          createTodo={this.createTodo}
          todos={this.state.todos}
        />
        <TodoList todos={this.state.todos} />
      </div>
    );
  }
}

export default App;
