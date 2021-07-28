import React from 'react';
import './App.css';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { TodoList } from './components/TodoList/TodoList';

const preparedTodos = todosFromServer.map(todo => ({
  ...todo,
  userName: usersFromServer.find(user => todo.userId === user.id).name,
}));

class App extends React.Component {
  state = {
    todos: preparedTodos,
    task: '',
    user: '',
    messageError: '',
  }

  addTask = (event) => {
    this.setState({
      task: event.target.value,
      messageError: '',
    });
  }

  addUser = (event) => {
    this.setState({
      user: event.target.value,
      messageError: '',
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const { task, todos, user } = this.state;

    if (!user) {
      this.setState({ messageError: 'Please choose a user' });
    }

    if (!task) {
      this.setState({ messageError: 'Please add task' });
    }

    if (user && task) {
      this.setState(state => ({
        todos: [
          ...state.todos,
          {
            userName: user,
            title: task,
            userId: usersFromServer.find(usr => usr.name === user).id,
            completed: false,
            id: todos.length + 1,
          },
        ],
        task: '',
        user: '',
      }));
    }
  }

  render() {
    const { user, task, todos, messageError } = this.state;

    return (
      <div className="App">

        <h1>Add todo form</h1>

        <div className="container-form">
          <form onSubmit={this.handleSubmit}>
            <input
              type="text"
              name="task"
              value={task}
              onChange={this.addTask}
              placeholders="Add task"
            />

            <select
              name="selectUser"
              value={user}
              onChange={this.addUser}
            >
              <option>
                Choose a user
              </option>
              {usersFromServer.map(usr => (
                <option
                  key={usr.id}
                  value={usr.name}
                >
                  {usr.name}
                </option>
              ))}
            </select>

            <button type="submit">Add</button>

            <div className="messageError">{messageError}</div>

            <TodoList todos={todos} />
          </form>
        </div>
      </div>
    );
  }
}

export default App;
