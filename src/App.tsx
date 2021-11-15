import React from 'react';
import './App.scss';

import users from './api/users';
import todos from './api/todos';
import { Todo } from './types/Types';

import { TodoList } from './components/TodoList';

const preparedTodos: Todo[] = todos.map((todo) => ({
  ...todo,
  user: users.find(user => user.id === todo.userId) || null,
}));

interface State {
  tasks: Todo[],
  newTaskTitle: string,
  selectedUserId: number,
  hasTitleError: boolean,
  hasUserError: boolean,
}

class App extends React.Component<{}, State> {
  state = {
    tasks: preparedTodos,
    newTaskTitle: '',
    selectedUserId: 0,
    hasTitleError: false,
    hasUserError: false,
  };

  changeTaskTitleHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ newTaskTitle: event.target.value });
    this.checkError();
  };

  chooseUserHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({ selectedUserId: Number(event.target.value) });
    this.checkError();
  };

  addNewTask = () => {
    this.setState((prevState) => {
      const { newTaskTitle, selectedUserId, tasks } = prevState;

      const newTask = {
        id: tasks.length + 1,
        title: newTaskTitle,
        userId: selectedUserId,
        user: users.find(user => user.id === selectedUserId) || null,
      };

      return { tasks: [...tasks, newTask] };
    });
  };

  submitTaskHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { newTaskTitle, selectedUserId } = this.state;

    this.checkError();

    if (newTaskTitle && selectedUserId) {
      this.addNewTask();

      this.setState({
        newTaskTitle: '',
        selectedUserId: 0,
      });
    }
  };

  checkError = () => {
    this.setState((prevState) => {
      const { newTaskTitle, selectedUserId } = prevState;

      return {
        hasTitleError: !newTaskTitle,
        hasUserError: !selectedUserId,
      };
    });
  };

  render() {
    const {
      tasks,
      newTaskTitle,
      selectedUserId,
      hasTitleError,
      hasUserError,
    } = this.state;

    return (
      <div className="App">
        <h1>Add todo form</h1>

        <form
          className="App__form"
          onSubmit={this.submitTaskHandler}
        >
          <label htmlFor="add-task-title">
            <span>Add task title </span>
            <input
              id="add-task-title"
              type="text"
              placeholder="Add task title"
              value={newTaskTitle}
              onChange={this.changeTaskTitleHandler}
            />
          </label>

          {hasTitleError && (
            <p
              className="App__error"
              style={{ color: 'red' }}
            >
              Please add a task title
            </p>
          )}

          <div>
            <span>Assign task to: </span>
            <select
              id="select-user"
              value={selectedUserId}
              onChange={this.chooseUserHandler}
            >
              <option value="0" disabled>Choose user</option>
              {users.map(user => (
                <option key={user.id} value={user.id}>{user.name}</option>
              ))}
            </select>
          </div>

          {hasUserError && (
            <p
              className="App__error"
              style={{ color: 'red' }}
            >
              Please choose a user
            </p>
          )}

          <button
            type="submit"
          >
            Add task
          </button>
        </form>

        <p>
          <span>Users: </span>
          {users.length}
        </p>

        <div>
          <span>Added tasks:</span>
        </div>

        <TodoList renderedTodos={tasks} />
      </div>
    );
  }
}

export default App;
