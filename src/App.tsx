import React from 'react';
import './App.scss';
import { TodoList } from './components/TodoList';

import users from './api/users';
import todos from './api/todos';

const RegEx = /^[a-zA-Za-åa-ö-w-я 0-9]/g;

class App extends React.Component<{}, State> {
  state = {
    title: '',
    taskId: todos[todos.length - 1].id + 1,
    userId: 0,
    preparedTasks: todos
      .map(task => ({
        ...task,
        user: users.find(person => person.id === task.userId) || null,
      })),
    noTitleError: '',
    nonValidTitle: '',
    noUserError: '',
  };

  validate = () => {
    const { title, userId } = this.state;
    let falseFlag = true;

    if (!title) {
      this.setState({ noTitleError: 'Please enter the title' });
      falseFlag = false;
    }

    if (!title.match(RegEx)) {
      this.setState({ nonValidTitle: 'Please use letters, digits and spaces only' });
      falseFlag = false;
    }

    if (!userId) {
      this.setState({ noUserError: 'Please choose a user' });
      falseFlag = false;
    }

    if (falseFlag) {
      return true;
    }

    return false;
  };

  handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
    const { name, value } = event.currentTarget;

    this.setState(state => ({
      ...state,
      [name]: !(+value) ? value : +value,
    }));
  };

  addTask = (event: React.FormEvent<EventTarget>): void => {
    event.preventDefault();
    const isValid = this.validate();

    if (isValid) {
      todos.push({
        userId: this.state.userId,
        id: this.state.taskId,
        title: this.state.title,
        completed: false,
      });

      this.setState((state) => ({
        taskId: state.taskId + 1,
        preparedTasks: todos
          .map(task => ({
            ...task,
            user: users.find(person => person.id === task.userId) || null,
          })),
      }));

      this.setState({
        title: '',
        userId: 0,
        noTitleError: '',
        nonValidTitle: '',
        noUserError: '',
      });
    }
  };

  render() {
    const {
      title,
      userId,
      preparedTasks,
      noTitleError,
      nonValidTitle,
      noUserError,
    } = this.state;

    return (
      <div className="App">
        <form
          id="addTask"
          onSubmit={this.addTask}
        >
          <select
            name="userId"
            value={userId}
            onChange={this.handleChange}
          >
            <option value={0}>
              Choose a user
            </option>
            {users.map(person => (
              <option key={person.id} value={person.id}>
                {person.name}
              </option>
            ))}
          </select>
          {noUserError && !userId && (
            <p>
              {noUserError}
            </p>
          )}
          <input
            type="text"
            placeholder="Write your task here"
            name="title"
            value={title}
            onChange={this.handleChange}
          />
          {noTitleError && !title && (
            <p>
              {noTitleError}
            </p>
          )}

          {nonValidTitle && title && !title.match(RegEx) && (
            <p>
              {nonValidTitle}
            </p>
          )}
          <button
            type="submit"
            form="addTask"
          >
            Add
          </button>
        </form>
        <TodoList tasks={preparedTasks} />
      </div>
    );
  }
}

export default App;
