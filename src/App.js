import React from 'react';
import './App.css';

import users from './api/users';
import todos from './api/todos';
import { List } from './components/List';

const updateTodos = todos.map(todo => ({
  ...todo,
  user: users.find(user => user.id === todo.userId).name,
}));

class App extends React.Component {
  state= {
    renderList: updateTodos,
    id: updateTodos.length + 1,
    task: '',
    user: '',
    userErr: false,
    taskErr: false,
  }

  ChangeUser = (event) => {
    this.setState({
      user: event.target.value,
      userErr: false,
    });
  }

  ChangeTask = (event) => {
    this.setState({
      task: event.target.value,
      taskErr: false,
    });
  }

  addTask = (event) => {
    event.preventDefault();

    if (this.state.user.length === 0) {
      this.setState({ userErr: true });
    }

    if (this.state.task.trim().length === 0) {
      this.setState({ taskErr: true });
    }

    if (this.state.user.length && this.state.task.trim().length > 0) {
      this.setState((state) => {
        const newTask = {
          id: state.id,
          user: state.user,
          title: state.task,
          completed: false,
        };

        return ({
          id: state.id + 1,
          renderList: [...state.renderList, newTask],
          task: '',
          user: '',
        });
      });
    }
  }

  render() {
    const { renderList, task, user, userErr, taskErr } = this.state;

    return (
      <div className="App">
        <h1>Add todo form</h1>

        <form
          action="./api/todos"
          method="POST"
          onSubmit={this.addTask}
        >
          {taskErr
            && <span className="form__taskError">Please enter the title</span>
          }
          <label htmlFor="new-todo-input" className="form__input">
            Add Task
          </label>
          <input
            type="text"
            name="newTodo"
            id="new-todo-input"
            placeholder="write new task"
            value={task}
            onChange={this.ChangeTask}
          />

          <label htmlFor="select-people" className="form__select">
            Select People
          </label>
          <select
            value={user}
            id="select-people"
            onChange={this.ChangeUser}
          >
            <option value="">Choose a User</option>
            {users.map(person => (
              <option key={person.id}>{person.name}</option>
            ))}
          </select>

          <button type="submit" className="form__button">
            Add
          </button>
          {userErr && (
            <span className="form__userError">
              Please choose a user
            </span>
          )}
        </form>

        <List renderList={renderList} />

      </div>
    );
  }
}

export default App;
