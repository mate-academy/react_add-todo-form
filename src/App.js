import React from 'react';
import './App.css';
import { ToDoList } from './components/TodoList/TodoList';

import users from './api/users';
import todos from './api/todos';

const preparedTodos = todos.map(todo => ({
  ...todo,
  userName: users.find(user => user.id === todo.userId).name,
}));

class App extends React.Component {
  state = {
    task: '',
    user: '',
    taskErr: false,
    userError: false,
    todos: preparedTodos,
    id: preparedTodos.length + 1,
  }

  newTaskHandler = (event) => {
    this.setState({
      task: event.target.value,
      taskErr: false,
    });
  }

  chooseUser = (event) => {
    this.setState({
      user: event.target.value,
      userError: false,
    });
  }

  addNewTodoItem = (event) => {
    event.preventDefault();

    if (!this.state.user.length) {
      this.setState({
        userError: true,
      });
    }

    if (!this.state.task.trim().length) {
      this.setState({
        taskErr: true,
      });
    }

    if (this.state.user.length && this.state.task.trim().length) {
      this.setState((state) => {
        const newTodo = {
          id: state.id + 1,
          title: state.task,
          userName: state.user,
          completed: false,
        };

        return ({
          id: state.id + 1,
          todos: [...state.todos, newTodo],
          task: '',
          user: '',
        });
      });
    }
  }

  render() {
    const { task, user } = this.state;

    return (
      <div className="App">
        <h1>Add todo form</h1>
        <form onSubmit={this.addNewTodoItem}>
          <label htmlFor="task">
            <p>
              Add task
              {' '}
              {this.state.taskErr && (
                <span className="tag is-danger">
                  Please enter the title
                  {' '}
                </span>
              )}
              <input
                type="text"
                name="task"
                id="task"
                placeholder="Add new task"
                value={task}
                onChange={this.newTaskHandler}
              />
            </p>
          </label>
          <label htmlFor="user">
            <p>
              Choose user
              {' '}
              {this.state.userError && (
                <span className="tag is-danger">
                  Please choose a user
                  {' '}
                </span>
              )}

              <select
                id="user"
                name="user"
                value={user}
                onChange={this.chooseUser}
              >
                <option value="">
                  Choose a user
                </option>
                {users.map(someUser => (
                  <option
                    key={someUser.id}
                    value={user.name}
                  >
                    {someUser.name}
                  </option>
                ))}
              </select>
            </p>
          </label>

          <button
            type="submit"
          >
            Add
          </button>
        </form>
        <ToDoList
          todos={this.state.todos}
        />
      </div>
    );
  }
}

export default App;
