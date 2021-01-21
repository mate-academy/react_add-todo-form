import React from 'react';
import { TodoList } from './components/TodoList';
import './App.css';
import todosFromApi from './api/todos';
import users from './api/users';

function getUserById(UserId) {
  return users.find(user => user.id === UserId);
}

const preparedTodos = todosFromApi.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

class App extends React.Component {
  state = {
    todos: preparedTodos,
    taskTitle: '',
    userId: 0,
    errorUser: false,
    errorTitle: false,
  }

  handleChange = (event) => {
    const { value, name } = event.target;
    const correctValue = name === 'userId' ? +value : value;

    this.setState({ [name]: correctValue });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { userId, taskTitle } = this.state;

    this.setState({
      errorUser: false,
      errorTitle: false,
    });

    if (userId === 0) {
      this.setState({ errorUser: true });

      return;
    }

    if (taskTitle.trim().length < 1) {
      this.setState({ errorTitle: true });

      return;
    }

    this.setState((state) => {
      const newTask = {
        id: Math.random(),
        title: taskTitle,
        completed: false,
        user: getUserById(userId),
      };

      return ({
        todos: [newTask, ...state.todos],
        users: state.users,
        taskTitle: '',
        userId: 0,
      });
    });
  }

  render() {
    const { todos,
      taskTitle,
      userId,
      errorUser,
      errorTitle } = this.state;

    return (
      <div className="App">
        <h1>TODO</h1>
        <form
          action="/api/goods"
          method="POST"
          className="input-group"
          onSubmit={this.handleSubmit}
        >
          <div className="input-group">
            <div className="input-group-prepend">
              <label htmlFor="task" className="input-group-text">
                Title of the new task
              </label>
            </div>
            <input
              type="text"
              name="taskTitle"
              className="form-control"
              placeholder="Type your task..."
              value={taskTitle}
              onChange={this.handleChange}
            />

            <select
              name="userId"
              className="form-control"
              value={userId}
              onChange={this.handleChange}
            >
              <option value="0">Choose a user</option>

              {users.map(user => (
                <option value={user.id} key={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
            <div className="input-group-append">
              <button type="submit" className="btn btn-outline-secondary">
                Add a new task
              </button>
            </div>

          </div>
        </form>

        { errorUser
        && <div className="alert alert-danger">Please choose a user!</div>}
        { errorTitle
        && <div className="alert alert-danger">Please enter the title!</div>}

        <TodoList todos={todos} />
      </div>
    );
  }
}

export default App;
