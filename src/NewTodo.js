import React from 'react';
import './NewTodo.css';
import propTypes from 'prop-types';

class NewTodo extends React.Component {
  state = {
    valuesMap: {
      title: '',
      userId: '',
    },
    errorsMap: {
      title: '',
      userId: '',
    },
  };

  onFieldChange = (event) => {
    const { name, value } = event.target;

    this.setState(state => ({
      valuesMap: {
        ...state.valuesMap,
        [name]: value,
      },
    }));
  };

  foundErrors = (field, value) => {
    if (!value) {
      this.setState(state => ({
        errorsMap: {
          ...state.errorsMap,
          [field]: true,
        },
      }));

      return true;
    }

    return false;
  };

  onFocusInput = (event) => {
    const nameInputErrors = event.target.name;

    this.setState(state => ({
      errorsMap: {
        ...state.errorsMap,
        [nameInputErrors]: false,
      },
    }));
  };

  onHandleSubmit = (event) => {
    event.preventDefault();
    const { title, userId } = this.state.valuesMap;

    if (this.foundErrors('title', title)
      || this.foundErrors('userId', userId)) {
      return;
    }

    this.props.addTodo(this.state.valuesMap);
    this.setState({
      valuesMap: {
        userId: '',
        title: '',
      },
      errorsMap: {
        title: false,
        userId: false,
      },
    });
  };

  render() {
    const { valuesMap, errorsMap } = this.state;

    return (
      <form
        className="form"
        onSubmit={this.onHandleSubmit}
      >
        <fieldset className="form--field">

          <label htmlFor="title">
            Title:
            <input
              type="text"
              name="title"
              onChange={this.onFieldChange}
              value={valuesMap.title}
              placeholder="Title of todo"
              className="form--field-todo"
              autoComplete="off"
              onFocus={this.onFocusInput}
            />
          </label>

          <div className={errorsMap.title
            ? 'form--field-error'
            : 'invisible'}
          >
            Enter a new task!
          </div>

        </fieldset>

        <fieldset className="form--field">

          {/* eslint-disable-next-line jsx-a11y/label-has-for */}
          <label htmlFor="userId">
            Choice User:
            <select
              name="userId"
              id="userId"
              key={valuesMap.userId}
              onChange={this.onFieldChange}
              value={valuesMap.userId}
              className="form--field-user"
              onFocus={this.onFocusInput}
            >
              <option value="" selected disabled>Users</option>
              {
                this.props.users.map(user => (
                  <option key={user.id} value={user.id}>{user.name}</option>
                ))
              }
            </select>

            <div className={errorsMap.userId
              ? 'form--field-error'
              : 'invisible'}
            >
              Choose a user!
            </div>
          </label>
        </fieldset>

        <button
          type="submit"
          className="form--button-submit"
        >
          Add new task
        </button>
      </form>
    );
  }
}

NewTodo.propTypes = {
  users: propTypes.shape().isRequired,
  addTodo: propTypes.func.isRequired,
};

export default NewTodo;
