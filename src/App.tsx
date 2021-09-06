import React from 'react';
import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import classNames from 'classnames';

import { TodoList } from './components/TodoList';

import users from './api/users';
import todos from './api/todos';

const RegEx = /^[a-zA-Za-åa-ö-w-я 0-9]/g;
const tasks = [...todos];

class App extends React.Component<{}, State> {
  state = {
    title: '',
    taskId: tasks[tasks.length - 1].id + 1,
    userId: 0,
    preparedTasks: tasks
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

  handleChange = (event: React.FormEvent<HTMLInputElement | HTMLSelectElement>): void => {
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
      tasks.push({
        userId: this.state.userId,
        id: this.state.taskId,
        title: this.state.title,
        completed: false,
      });

      this.setState((state) => ({
        taskId: state.taskId + 1,
        preparedTasks: tasks
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
      <div className="App container">
        <form
          className="form-inline form-row App__form"
          id="addTask"
          onSubmit={this.addTask}
        >
          <label
            className="sr-only col-sm-3"
            htmlFor="inlineFormCustomSelect"
          >
            <select
              id="inlineFormCustomSelect"
              className="form-select"
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
            <p className={classNames('App__alert alert alert-danger', {
              'App__alert--shown': noUserError && userId === 0,
            })}
            >
              {noUserError && userId === 0 && (noUserError)}
            </p>
          </label>

          <label htmlFor="inlineFormInputGroup" className="col-sm-3">
            <input
              id="inlineFormInputGroup"
              className="form-control"
              type="text"
              placeholder="Write your task here"
              name="title"
              value={title}
              onChange={this.handleChange}
            />

            <p className={classNames('App__alert alert alert-danger', {
              'App__alert--shown': (noTitleError && !title)
              || (nonValidTitle && !title.match(RegEx) && title),
            })}
            >
              {(noTitleError && !title && (
                noTitleError
              )) || (nonValidTitle && !title.match(RegEx) && title && (
                nonValidTitle
              ))}
            </p>
          </label>

          <button
            className="btn btn-primary col-sm-3 App__button"
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
