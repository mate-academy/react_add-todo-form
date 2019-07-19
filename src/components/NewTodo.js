import React from 'react';
import PropTypes from 'prop-types';
import users from '../api/users';

class NewTodo extends React.Component {
  state = {
    valuesMap: {
      title: '',
      userId: 0,
    },
  };

  handleFormSubmit = (event) => {
    event.preventDefault();

    const { userId } = this.state.valuesMap;

    this.props.onSubmit({
      ...this.state.valuesMap,
      id: this.props.todos.length + 1,
      user: users.find(user => user.id === +userId),
      completed: false,
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
    }));
  };

  render() {
    const { valuesMap } = this.state;

    return (
      <div>

        <form onSubmit={this.handleFormSubmit}>
          <div className="form-field">
            <label htmlFor="title">
              Title:
              <input
                type="text"
                name="title"
                id="title"
                value={valuesMap.title}
                placeholder="Input title"
                onChange={this.handleFieldChange}
              />
            </label>

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

          </div>

          <button type="submit">
            Add Todo
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
