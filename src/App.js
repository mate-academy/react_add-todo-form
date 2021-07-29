import React from 'react';
import './App.css';

import users from './api/users';
import originalTodos from './api/todos';
import { TodoList } from './components/TodoList/TodoList';

const preparedTodos = originalTodos.map(todo => ({
  ...todo,
  user: users.find(user => user.id === todo.userId),
}));

class App extends React.Component {
  state = {
    todos: preparedTodos,
    currentTask: '',
    currentUser: 0,
    taskError: false,
    userError: false,
  }

  addTodo = () => {
    const { todos, currentTask, currentUser } = this.state;

    const todo = {
      id: todos.length + 1,
      title: currentTask,
      completed: false,
      user: users[currentUser],
    };

    this.setState({
      taskError: !currentTask,
      userError: !currentUser,
    });

    if (!currentTask || !currentUser) {
      return;
    }

    this.setState({
      todos: [...todos, todo],
      currentTask: '',
      currentUser: 0,
    });
  }

  handleInputChange = (event) => {
    this.setState({
      currentTask: event.target.value,
    });
  }

  handleUserChange = (event) => {
    this.setState({
      currentUser: event.target.value,
    });
  }

  render() {
    const {
      todos,
      currentTask,
      currentUser,
      taskError,
      userError,
    } = this.state;

    return (
      <div className="App">
        <h1>Add todo form</h1>

        <form
          className="form"
          onSubmit={(event) => {
            event.preventDefault();
            this.addTodo();
          }}
        >
          <label>
            <input
              type="text"
              name="text"
              placeholder="add todo"
              value={currentTask}
              onChange={this.handleInputChange}
            />
            {taskError && (
              <span className="error">Please enter your text</span>
            )}
          </label>
          <div>
            <select
              name="user"
              value={currentUser}
              onChange={this.handleUserChange}
            >
              <option>
                Choose a user
              </option>
              {users.map(user => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
            {userError && (
              <span className="error">Please choose a user</span>
            )}
          </div>
          <button
            type="submit"
          >
            Add
          </button>
        </form>

        <TodoList todos={todos} />
      </div>
    );
  }
}

export default App;
