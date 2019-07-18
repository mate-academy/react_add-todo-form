import React, { Component } from 'react';
import PropTypes from 'prop-types';

class NewTodo extends Component {
  constructor(props, data, users) {
    super(props, data, users);

    this.state = {
      inputControl: '',

      valuesMap: {
        id: [...this.props.data].length + 1,
        title: '',
        completed: false,
        user: {
          name: '',
        },
      },

      errorsMap: {
        title: '',
        user: {
          name: '',
        },
      },

    };
  }

  handleChange = (event) => {
    event.preventDefault();

    const value = event.target.value.replace(/[^\w\d\s]/g, '');
    const { valuesMap } = this.state;

    this.setState({
      inputControl: value,
      valuesMap: {
        ...valuesMap,
        id: [...this.props.data].length + 1,
        ...valuesMap.user,
        title: value,
        inputControl: '',
      },
    });
  };

  handleChangeSelect = (event) => {
    event.preventDefault();
    const { value } = event.target;
    const { valuesMap } = this.state;

    this.setState({
      valuesMap: {
        ...valuesMap,
        id: [...this.props.data].length + 1,

        user: {
          name: value,
        },
      },
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.onFormSubmit(this.state.valuesMap);

    const errorsMap = {
      title: '',
      user: {
        name: '',
      },
    };

    this.setState((prevState) => {
      if (!prevState.errorsMap.title) {
        errorsMap.title = 'Please enter the title';
      }

      if (!prevState.errorsMap.user.name) {
        errorsMap.user.name = 'Please choose a user';
      }

      if (Object.keys(errorsMap).length > 0) {
        return { errorsMap };
      }

      return true;
    });
  }

  render() {
    const { errorsMap, inputControl } = this.state;
    const { users } = this.props;

    return (
      <form onSubmit={this.handleSubmit} noValidate>
        <div className="form-box">
          <div className="task-field ">
            <label htmlFor="todo">
              Todo:
              <input
                className="task-input"
                onChange={this.handleChange}
                id="todo"
                name="title"
                placeholder="Enter task"
                autoComplete="off"
                value={inputControl}
                maxLength="40"
              />
            </label>
            {errorsMap.title && (
              <div className="error">{errorsMap.title}</div>
            )}
          </div>
          {' - '}
          <div className="person-field">
            <select
              className="person-select"
              name="name"
              onChange={this.handleChangeSelect}
            >
              <option>choose name...</option>

              {users.map(user => (
                <option name="name" value={user.name} key={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
            {' '}
            <button type="submit">+ Add</button>
          </div>
        </div>
      </form>
    );
  }
}

NewTodo.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  users: PropTypes.arrayOf(PropTypes.object).isRequired,
  onFormSubmit: PropTypes.func.isRequired,
};

export default NewTodo;
