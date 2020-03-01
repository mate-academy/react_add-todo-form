import React from 'react';
import './App.css';
import { NewTodo } from './NewTodo/NewTodo';
import { TodoList } from './TodoList/TodoList';

import users from './api/users';
import todos from './api/todos';

class App extends React.Component {
  state = {
    todos: [...todos],
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
          {users.length}
        </p>
        <NewTodo
          todosLength={this.state.todos.length}
          addTask={this.addTask}
          users={users}
        />
        <TodoList todos={this.state.todos} />
      </div>
    );
  }
}

export default App;
