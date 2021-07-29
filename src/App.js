import React from 'react';
import './App.css';

import users from './api/users';
import todos from './api/todos';

import { TodoList } from './components/Todolist/Todolist';

const preparedTodos = todos.map(task => ({
  ...task,
  user: users.find(person => person.id === task.userId).name,
}));

class App extends React.Component {
  state = {
    name: '',
    task: '',
    validationTextMessage: '',
    validationNameMessage: '',

  }

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
  };

  addTodo = () => {
    const { task, name } = this.state;

    if (task === '') {
      this.setState({
        validationTextMessage: 'Please enter the title',
      });
    }

    if (name === '') {
      this.setState({
        validationNameMessage: 'Please choose a user',
      });
    }

    if (name && task) {
      preparedTodos.push(
        {
          userId: users.find(user => user.name === name).id,
          id: preparedTodos.length + 1,
          title: task,
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
    // eslint-disable-next-line max-len
    const { task, name, validationNameMessage, validationTextMessage } = this.state;

    return (
      <div>
        <h1>Adding tasks through the form</h1>
        <form
          onSubmit={this.handleSubmit}
        >
          <input
            type="text"
            name="task"
            placeholder="Name of task"
            onChange={this.handleChange}
            value={task}
          />
          {validationTextMessage && (
            <span>
              Please write text!
            </span>
          )}
          <select
            name="name"
            onChange={this.handleChange}
            value={name}
          >
            <option value="" disabled>Choose a user</option>
            {
              users.map(user => (
                <option key={user.id}>
                  {user.name}
                </option>
              ))
            }
          </select>
          {validationNameMessage && (
            <span>
              Please choose a user!
            </span>
          )}
          <button type="submit">Add task</button>
        </form>
        <TodoList preparedTodos={preparedTodos} />
      </div>
    );
  }
}

export default App;
