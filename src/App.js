import React from 'react';
import './App.css';

import users from './api/users';
import todos from './api/todos';
import { TodoList } from './components/TodoList';

const processedTodos = todos.map(todo => ({
  ...todo,
  user: users.find(user => user.id === todo.userId),
}));

class App extends React.Component {
  state = {
    userErr: '',
    taskErr: '',
    task: '',
    user: '0',
    todos: processedTodos,
  }

  inputHandler = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
      [`${event.target.name}Err`]: '',
    });
    this.forceUpdate();
  }

  addHandler = (event) => {
    event.preventDefault();
    const { task, user } = this.state;
    const taskErr = task === '';
    const userErr = user === '0';

    if (userErr || taskErr) {
      if (taskErr) {
        this.setState(state => ({
          ...state,
          taskErr: 'Please add a task',
        }));
      }

      if (userErr) {
        this.setState(state => ({
          ...state,
          userErr: 'Please choose a user',
        }));
      }

      return;
    }

    this.setState(state => ({
      userErr: '',
      taskErr: '',
      task: '',
      user: '0',
      todos: [
        ...state.todos,
        {
          completed: false,
          id: todos.length + 1,
          title: task,
          userId: user,
          user: users.find(person => person.id === +user),
        },
      ],
    }));
  }

  render() {
    const { task, user } = this.state;

    return (
      <div className="App">
        <form className="form">
          <label className="form__label">
            task:
            &nbsp;
            <input
              type="text"
              name="task"
              className="form-input"
              placeholder="Write task here"
              value={task}
              onChange={this.inputHandler}
            />

            {this.state.taskErr && (
              <div className="form__error">{this.state.taskErr}</div>
            )}
          </label>

          {' '}

          <label className="form__label">
            user:
            &nbsp;
            <select
              name="user"
              className="form-input"
              value={user}
              onChange={this.inputHandler}
            >
              <option value="0">Choose a user</option>

              {users.map(person => (
                <option value={person.id} key={person.id}>
                  {person.name}
                </option>
              ))}
            </select>

            {this.state.userErr && (
              <div className="form__error">{this.state.userErr}</div>
            )}
          </label>

          {' '}

          <button
            type="submit"
            className="form__submit"
            onClick={this.addHandler}
          >
            Add task
          </button>
        </form>

        <TodoList todos={this.state.todos} />
      </div>
    );
  }
}

export default App;
