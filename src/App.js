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
    userName: false,
    todo: false,
  };

  selectUser = (event) => {
    this.setState({
      user: event.target.value,
      userName: false,
    });
  };

  selectTask = (event) => {
    this.setState({
      task: event.target.value,
      todo: false,
    });
  };

  addTask = (event) => {
    event.preventDefault();

    if (!this.state.user) {
      this.setState({ userName: true });
    }

    if (!this.state.task.trim()) {
      this.setState({ todo: true });
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
    const { renderList, task, user, userName, todo } = this.state;

    return (
      <div className="App">
        <form
          onSubmit={this.addTask}
        >
          <input
            type="text"
            name="newTodo"
            placeholder="Enter a new task"
            value={task}
            onChange={this.selectTask}
          />

          <select
            value={user}
            onChange={this.selectUser}
          >
            <option value="">Choose a user</option>
            {users.map(man => (
              <option
                key={man.id}
              >
                {man.name}
              </option>
            ))}
          </select>

          <button type="submit">
            Add a new task
          </button>
        </form>

        {todo && (
        <div className="App__error">Please enter the new task</div>
        )}

        {userName && (
        <div className="App__error">Please choose a user</div>
        )}

        <TodosList todos={renderList} />
      </div>
    );
  }
}

export default App;
