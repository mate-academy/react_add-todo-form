import React from 'react';
import PropTypes from 'prop-types';
import users from '../api/users';

class NewTodo extends React.Component {
  state = {
    valuesMap: {
      title: '',
      userId: 0,
    },
    errorsMap: {
      title: '',
      userId: '',
    },
  };

  handleFormSubmit = (event) => {
    event.preventDefault();

    const errorsMap = {};
    const pattern = '^[0-9a-zA-Z ]+$';

    this.setState((prevState) => {
      if (!prevState.valuesMap.title) {
        errorsMap.title = 'Please enter the title';
      }

      if (!prevState.valuesMap.title.match(pattern)) {
        errorsMap.title = 'The Title not valid';
      }

      if (+prevState.valuesMap.userId === 0) {
        errorsMap.userId = 'Please choose a user';
      }

      if (Object.keys(errorsMap).length > 0) {
        return { errorsMap };
      }

      const { userId } = prevState.valuesMap;

      this.props.onSubmit({
        ...prevState.valuesMap,
        id: this.props.todos.length + 1,
        user: users.find(user => user.id === +userId),
        completed: false,
      });

      return {};
    });

    this.setState({
      valuesMap: {
        title: '',
        userId: 0,
      },
    });
  };

  handleFieldChange = (event) => {
    const { name, value } = event.target;

    this.setState(state => ({
      valuesMap: {
        ...state.valuesMap,
        [name]: value,
      },
      errorsMap: {
        title: '',
        userId: '',
      },
    }));
  };

  render() {
    const { valuesMap, errorsMap } = this.state;

    return (
      <div className="NewTodo">

        <form onSubmit={this.handleFormSubmit}>
          <div>
            <label htmlFor="title">
              Title:
              <input
                type="text"
                name="title"
                id="title"
                autoComplete="off"
                value={valuesMap.title}
                placeholder="Input title"
                onChange={this.handleFieldChange}
                // pattern="^[0-9a-zA-Z ]+$"
              />
            </label>
            {errorsMap.title && (
              <div className="error" style={{ color: 'red' }}>
                {errorsMap.title}
              </div>
            )}
          </div>

          <div className="form-field">
            <label htmlFor="userId">
              User
              <select
                name="userId"
                id="userId"
                onChange={this.handleFieldChange}
                value={valuesMap.userId}
              >
                <option value="" hidden selected>Chose a user</option>

                {users.map(user => (
                  <option key={user.id} value={user.id}>
                    {user.name}
                  </option>
                ))}
              </select>

            </label>
            {errorsMap.userId && (
              <div className="error" style={{ color: 'red' }}>
                {errorsMap.userId}
              </div>
            )}
          </div>

          <button className="form-submit" type="submit">
            Add
          </button>

        </form>
      </div>
    );
  }
}

NewTodo.propTypes = {
  onSubmit: PropTypes.func,
  todos: PropTypes.arrayOf(PropTypes.shape({
    userId: PropTypes.number,
    id: PropTypes.number,
    title: PropTypes.string,
    length: PropTypes.number,
    completed: PropTypes.bool,
  })).isRequired,
};

NewTodo.defaultProps = {
  onSubmit: () => {},
};

export default NewTodo;
