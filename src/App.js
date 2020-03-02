import React from 'react';
import './App.css';
import { NewTodo } from './NewTodo/NewTodo';
import { TodoList } from './TodoList/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

class App extends React.Component {
  state = {
    todos: [...todosFromServer],
  }

  addTask = (newTask) => {
    this.setState(prevState => ({
      todos: [...prevState.todos, newTask],
    }));
  }

  render() {
    return (
      <div className="App">
        <h1>Add todo form</h1>

        <p>
          <span>Users: </span>
          {todosFromServer.length}
        </p>
        <NewTodo
          todos={this.state.todos}
          addTask={this.addTask}
          users={usersFromServer}
        />
        <TodoList todos={this.state.todos} />
      </div>
    );
  }
}

export default App;
