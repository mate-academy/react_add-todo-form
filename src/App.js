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
  }

  handleChange = (event) => {
    const { name } = event.target;

    this.setState({
      [name]: event.target.value,
    });
    this.setState({});
  };

  addTodo = () => {
    const { task, name } = this.state;

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

    return null;
  }

  handleSubmit=(event) => {
    event.preventDefault();
    this.setState({
      task: '',
      name: '',
    });
    this.addTodo();
  }

  render() {
    const { task, name } = this.state;

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
            required
          />
          <select
            className="form-select"
            aria-label="Default select example"
            name="name"
            onChange={this.handleChange}
            value={name}
            required
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
          <button type="submit" className="btn btn-secondary">Add</button>
        </form>
        <TodoList preparedTodos={preparedTodos} />
      </div>
    );
  }
}

export default App;
