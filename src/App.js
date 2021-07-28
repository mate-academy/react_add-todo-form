import React from 'react';
import './App.css';
import { TodosList } from './components/TodosList';

import users from './api/users';
import todos from './api/todos';

const todosWithUsers = todos.map(todo => ({
  ...todo,
  user: users.find(user => user.id === todo.userId).name,
}));

class App extends React.Component {
  state = {
    renderList: todosWithUsers,
    id: todosWithUsers.length + 1,
    task: '',
    user: '',
    userError: false,
    taskError: false,
  };

  selectUser = (event) => {
    this.setState({
      user: event.target.value,
      userError: false,
    });
  };

  selectTask = (event) => {
    this.setState({
      task: event.target.value,
      taskError: false,
    });
  };

  addTask = (event) => {
    event.preventDefault();

    if (!this.state.user) {
      this.setState({ userError: true });
    }

    if (!this.state.task.trim()) {
      this.setState({ taskError: true });
    }

    if (this.state.user.length && this.state.task.trim().length) {
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
    const { renderList, task, user, userError, taskError } = this.state;

    return (
      <div className="App">
        <form
          onSubmit={this.addTask}
        >
          {taskError && (
            <span className="error">Please enter the title</span>
          )}

          <input
            type="text"
            name="newTodo"
            placeholder="Write a new task"
            value={task}
            onChange={this.selectTask}
          />

          <select
            value={user}
            onChange={this.selectUser}
          >
            <option value="">Choose a User</option>
            {users.map(person => (
              <option
                key={person.id}
              >
                {person.name}
              </option>
            ))}
          </select>

          {userError && (
            <span className="error">Please choose a user</span>
          )}

          <button type="submit">
            Add task
          </button>
        </form>

        <TodosList todos={renderList} />
      </div>
    );
  }
}

export default App;
