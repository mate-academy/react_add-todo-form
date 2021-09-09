import React from 'react';
import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import classNames from 'classnames';

import { TodoList } from './components/TodoList';

import users from './api/users';
import todos from './api/todos';

const RegEx = /^[a-zA-Za-åa-ö-w-я 0-9 ]+$/g;
const preparedTasks = todos.map(task => ({
  ...task,
  user: users.find(person => person.id === task.userId) || null,
}));

class App extends React.Component<{}, State> {
  state: State = {
    title: '',
    taskId: preparedTasks[preparedTasks.length - 1].id + 1,
    userId: 0,
    tasks: preparedTasks,
    noTitleError: '',
    nonValidTitle: '',
    noUserError: '',
  };

  resetState = () => {
    this.setState({
      title: '',
      userId: 0,
      noTitleError: '',
      nonValidTitle: '',
      noUserError: '',
    });
  };

  validate = () => {
    const { title, userId } = this.state;
    let validFlag = true;

    if (!title.trim()) {
      this.setState({ noTitleError: 'Please enter the title' });
      validFlag = false;
    }

    if (!title.match(RegEx)) {
      this.setState({ nonValidTitle: 'Please use letters, digits and spaces only' });
      validFlag = false;
    }

    if (!userId) {
      this.setState({ noUserError: 'Please choose a user' });
      validFlag = false;
    }

    return validFlag;
  };

  addTask = (event: React.FormEvent<EventTarget>): void => {
    event.preventDefault();
    const isValid = this.validate();

    if (isValid) {
      const newTask = {
        userId: this.state.userId,
        id: this.state.taskId,
        title: this.state.title,
        completed: false,
        user: users.find(person => person.id === this.state.userId) || null,
      };

      this.setState((state) => ({
        taskId: state.taskId + 1,
        tasks: [...state.tasks, newTask],
      }));

      this.resetState();
    }
  };

  render() {
    const {
      title,
      userId,
      tasks,
      noTitleError,
      nonValidTitle,
      noUserError,
    } = this.state;

    return (
      <div className="App container vh-100 d-flex flex-column justify-content-between">
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
              onChange={(event) => {
                this.setState({
                  userId: +event.target.value,
                });
              }}
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
            {noUserError && (
              <p className={classNames('App__alert alert alert-danger', {
                'App__alert--shown': noUserError && userId === 0,
              })}
              >
                {noUserError}
              </p>
            )}
          </label>

          <label htmlFor="inlineFormInputGroup" className="col-sm-3">
            <input
              id="inlineFormInputGroup"
              className="form-control"
              type="text"
              placeholder="Write your task here"
              name="title"
              value={title}
              onChange={(event) => {
                this.setState(state => ({
                  title: event.target.value,
                  noTitleError: event.target.value.trim() ? '' : state.noTitleError,
                  nonValidTitle: event.target.value.match(RegEx) ? '' : state.nonValidTitle,
                }));
              }}
            />

            <p className={classNames('App__alert alert alert-danger', {
              'App__alert--shown': noTitleError || nonValidTitle,
            })}
            >
              {noTitleError || nonValidTitle}
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
        <TodoList tasks={tasks} />
      </div>
    );
  }
}

export default App;
