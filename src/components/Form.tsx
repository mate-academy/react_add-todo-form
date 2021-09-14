import React from 'react';
import classNames from 'classnames';

import users from '../api/users';

interface Props {
  addTask: (newTask: Task) => void;
  currentTaskId: number;
}

interface State {
  userId: number;
  userError: boolean;
  validTitleError: boolean;
  titleError: boolean;
  title: string;
}

const regEx = /^[a-zA-Zа-яґєіїА-ЯҐЄІЇ 0-9 ]+$/g;

export class Form extends React.Component<Props, State> {
  state: State = {
    title: '',
    userId: 0,
    titleError: false,
    validTitleError: false,
    userError: false,
  };

  userIdChangeHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({
      userId: +event.target.value,
    });
  };

  titleChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      title: event.target.value,
      titleError: false,
    });
  };

  resetState = () => {
    this.setState({
      title: '',
      userId: 0,
      titleError: false,
      validTitleError: false,
      userError: false,
    });
  };

  validate = () => {
    const {
      title,
      userId,
    } = this.state;
    let valid = true;

    if (!title.trim()) {
      this.setState({
        titleError: true,
      });

      valid = false;
    }

    if (!title.match(regEx) && title) {
      this.setState({
        validTitleError: true,
      });

      valid = false;
    }

    if (!userId) {
      this.setState({
        userError: true,
      });

      valid = false;
    }

    return valid;
  };

  onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const isValid = this.validate();
    const { addTask, currentTaskId } = this.props;

    if (isValid) {
      const newTask = {
        title: this.state.title,
        userId: this.state.userId,
        id: currentTaskId + 1,
        user: users.find(user => user.id === this.state.userId),
      };

      addTask(newTask as Task);
      this.resetState();
    }
  };

  render() {
    const {
      title,
      userId,
      titleError,
      validTitleError,
      userError,
    } = this.state;

    return (
      <form
        className="form-inline form-row App__form"
        id="addTask"
        onSubmit={(event) => this.onSubmit(event)}
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
            onChange={this.userIdChangeHandler}
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
          {userError && (
            <p className={classNames('App__alert alert alert-danger', {
              'App__alert--shown': userError && userId === 0,
            })}
            >
              Please choose a user
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
            onChange={this.titleChangeHandler}
          />

          {(titleError || validTitleError) && !title.match(regEx) && (
            <p className={classNames('App__alert alert alert-danger', {
              'App__alert--shown': titleError || validTitleError,
            })}
            >
              {titleError && ('Please enter the title')}
              {validTitleError && ('Please use letters, digits and spaces only')}
            </p>
          )}
        </label>

        <button
          className="btn btn-primary col-sm-3 App__button"
          type="submit"
          form="addTask"
        >
          Add
        </button>
      </form>
    );
  }
}
