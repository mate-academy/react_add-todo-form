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
        user: { name: '' },
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
        user: { name: value },
      },
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.onFormSubmit(this.state.valuesMap);

    const clear = () => this.setState({ inputControl: '' });

    clear();
  };

  render() {
    const { inputControl, valuesMap } = this.state;
    const { users } = this.props;

    return (
      <form onSubmit={this.handleSubmit}>
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
            {valuesMap.title
              .split(' ')
              .filter(elem => elem.length > 1)
              .length > 1 ? (
                ''
              ) : (
                <div
                  className="error"
                  style={{ color: 'red', fontSize: '10px' }}
                >
                  {' '}
                Task must have minimum 2 words
                </div>
              )}
          </div>
          {' _ '}
          <div className="person-field">
            <select
              className="person-select"
              name="name"
              title="choose name"
              defaultValue=""
              onChange={this.handleChangeSelect}
            >
              <option value="">
                choose name...
              </option>

              {users.map(user => (
                <option name="name" value={user.name} key={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
            {' '}
            <button
              className={
                !valuesMap.title.trim()
                || !valuesMap.user.name
                || valuesMap.title
                  .split(' ')
                  .filter(elem => elem.length > 1)
                  .length < 2 ? 'btn btn-outline-info' : 'btn btn-info'
              }
              type="submit"
              title="Click to adding task"
              disabled={
                !valuesMap.title.trim()
                || !valuesMap.user.name
                || valuesMap.title
                  .split(' ')
                  .filter(elem => elem.length > 1)
                  .length < 2
              }
            >
              + Add
            </button>
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
