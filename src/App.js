import React from 'react';
import './App.css';

import users from './api/users';
import todos from './api/todos';
import { TodoList } from './Components/TodoList';

const preparedTodos = todos.map(task => ({
  ...task,
  user: users.find(person => person.id === task.userId).name,
}));

class App extends React.Component {
  state = {
    name: '',
    task: '',
    hiddenTaskMessage: '',
    hiddenNameMessage: '',

  }

  handleChange = (event) => {
    const { name } = event.target;

    this.setState({
      [name]: event.target.value,
      hiddenNameMessage: '',
      hiddenTaskMessage: '',
    });
  };

  addTodo = () => {
    const { task, name } = this.state;

    if (task === '') {
      this.setState({
        hiddenTaskMessage: 'Enter task please',
      });
    }

    if (name === '') {
      this.setState({
        hiddenNameMessage: 'Select user please',
      });
    }

    if (name && task) {
      preparedTodos.push(
        {
          userId: users.find(user => user.name === name).id,
          id: preparedTodos.length + 1,
          title: task,
          completed: false,
          user: name,
        },
      );
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({
      task: '',
      name: '',
    });
    this.addTodo();
  }

  render() {
    const { task, name, hiddenNameMessage, hiddenTaskMessage } = this.state;

    return (
      <div className="App">
        <h1>Add todo form</h1>
        <form
          className="card form"
          action=""
          onSubmit={this.handleSubmit}
        >
          <input
            type="text"
            name="task"
            id="search-query"
            className="input"
            placeholder="Type task"
            onChange={this.handleChange}
            value={task}
          />
          {hiddenTaskMessage && (
            <span
              className="alert alert-danger"
              role="alert"
            >
              Please choose a user!
            </span>
          )}
          <select
            className="form-select"
            aria-label="Default select example"
            name="name"
            onChange={this.handleChange}
            value={name}
          >
            <option value="" disabled>Please choose a user</option>
            {
              users.map(user => (
                <option key={user.id}>
                  {user.name}
                </option>
              ))
            }
          </select>
          {hiddenNameMessage && (
            <span
              className="alert alert-danger"
              role="alert"
            >
              Please choose a user!
            </span>
          )}
          <button type="submit" className="btn btn-secondary">Add</button>
        </form>
        <TodoList preparedTodos={preparedTodos} />
      </div>
    );
  }
}

export default App;
