import React from 'react';
import './App.css';
import PropTypes from 'prop-types';

class NewTodo extends React.Component {
  state = {
    todosNew: {
      title: '',
      userName: '',
    },

    errorsAddTodo: {
      title: '',
      userName: '',
    },
  }

  handleFieldChange = (event) => {
    const { name, value } = event.target;

    this.setState(({ todosNew }) => ({
      todosNew: {
        ...todosNew,
        [name]: value.replace(/[^\w]/, ''),
      },
    }));
  };

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState(({ todosNew }) => ({
      todosNew: {
        ...todosNew,
        [name]: value,
      },
    }));
  };

  handleInputFocus = (event) => {
    const errorClear = event.target.name;

    this.setState(prevState => ({
      ...prevState,
      errorsAddTodo: {
        ...prevState.errorsAddTodo,
        [errorClear]: false,
      },
    }));
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { todosNew } = this.state;
    const { onSubmit } = this.props;
    const errorsAddTodo = {};

    this.setState((prevState) => {
      if (!prevState.todosNew.title) {
        errorsAddTodo.title = 'Enter the title';
      }

      if (!prevState.todosNew.userName) {
        errorsAddTodo.userName = 'Choose correct hero';
      }

      if (Object.keys(errorsAddTodo).length > 0) {
        return { errorsAddTodo };
      }

      onSubmit(todosNew);

      return {};
    });

    this.setState({
      todosMap: {
        title: '',
        userName: '',
      },
    });
  };

  render() {
    const { todosNew, errorsAddTodo } = this.state;
    const { users } = this.props;

    return (

      <form
        className="form"
        onSubmit={this.handleSubmit}
      >
        <select
          id="userName"
          className="selectName"
          name="userName"
          onFocus={this.handleInputFocus}
          value={todosNew.userName}
          onChange={this.handleChange}
        >
          <option
            value=""
          >
          Choose your hero!
          </option>
          {users.map(user => (
            <option
              key={user.id}
              value={user.name}
              name="userName"
            >
              {user.name}
            </option>
          ))}
        </select>
        {errorsAddTodo.userName && (
          <div className="inputErrors">
            {errorsAddTodo.userName}
          </div>
        )}
        <div>
          <label
            className="newTodo"
            htmlFor="newTodo-title"
          >
            <input
              id="title"
              placeholder="Enter the title"
              value={todosNew.title}
              onFocus={this.handleInputFocus}
              name="title"
              type="text"
              onChange={this.handleFieldChange}
            />
          </label>
          {errorsAddTodo.title && (
            <div className="inputErrors">
              {errorsAddTodo.title}
            </div>
          )}
        </div>
        <button
          className="button-save"
          type="submit"
        >
              Save
        </button>
      </form>
    );
  }
}

NewTodo.propTypes = {
  users: PropTypes.arrayOf(PropTypes.object).isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default NewTodo;
