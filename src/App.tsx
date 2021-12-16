/* eslint-disable prefer-destructuring */
/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import './App.css';
import users from './api/users';
import todos from './api/todos';
import { TodoList } from './Components/TodoList';
import { Todo } from './Types/Todo';
import { User } from './Types/User';

type State = {
  tasks: Todo[],
  taskName: string,
  userName: string,
};

const completedList: Todo[] = todos.map((todo) => ({
  ...todo,
  user: users.find(user => user.id === todo.userId) || null,
}));

class App extends React.Component<{}, State> {
  state = {
    tasks: completedList,
    taskName: '',
    userName: 'Please choose a user',
  };

  createTask() {
    if (this.validate()) {
      const { tasks, taskName, userName } = this.state;
      let tempUser: User | null = users.find(user => user.name === userName) || null;

      if (tempUser === null) {
        tempUser = users[0];
      }

      const newTask: Todo = {
        userId: tempUser.id,
        id: tasks.length + 1,
        title: taskName,
        completed: false,
        user: tempUser,
      };

      this.setState((state) => ({
        tasks: [...state.tasks, newTask],
      }));
    }

    this.clearForm();
  }

  clearForm() {
    this.setState({
      taskName: '',
      userName: 'Please choose a user',
    });
  }

  validate(): boolean {
    const { taskName, userName } = this.state;

    if (taskName === '') {
      alert('Please enter valid Task');

      return false;
    }

    if (userName === 'Please choose a user') {
      alert('Please choose valid User');

      return false;
    }

    return true;
  }

  render(): React.ReactNode {
    return (
      <div className="App">
        <h1>Add todo form</h1>
        <form onSubmit={(event) => {
          event.preventDefault();
          this.createTask();
        }}
        >
          <input
            type="text"
            name="taskName"
            value={this.state.taskName}
            onChange={(event) => {
              this.setState({ taskName: event.target.value });
            }}
          />
          <select
            name="userName"
            value={this.state.userName}
            onChange={(event) => {
              this.setState({ userName: event.target.value });
            }}
          >
            <option value="Please choose a user">
              Please choose a user
            </option>
            {users.map((user) => (
              <option value={user.name}>
                {user.name}
              </option>
            ))}
          </select>
          <button type="submit">Create</button>
        </form>
        <p>
          <TodoList todos={this.state.tasks} />
        </p>
      </div>
    );
  }
}

export default App;
