import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { TodoTasks } from './component/TodoTasks';
import { TodoForm } from './component/TodoForm';

import users from './api/users';
import todosFromServer from './api/todosFromServer';

class App extends React.PureComponent {
  state = {
    todos: todosFromServer,
  }

  setTodos = (newTodo) => {
    this.setState(state => ({ todos: [
      ...state.todos,
      newTodo,
    ] }));
  }

  render() {
    const { todos } = this.state;

    return (
      <div className="App">
        <h1>Add todo form</h1>

        <TodoTasks users={users} todos={todos} />

        <TodoForm users={users} todos={todos} setTodos={this.setTodos} />

        <p>
          <span>Users: </span>
          {users.length}
          <br />
          <span>Todos: </span>
          {todos.length}
        </p>
      </div>
    );
  }
}

export default App;
