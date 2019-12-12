import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Select extends Component {
  state = {
    usedId: 0,
    title: '',
    inputError: false,
    selectError: false,
  };

  handleSetName = (e) => {
    this.setState({
      selectError: false,
      usedId: +e.target.value,
    });
  };

  handleSetTodoItem = (e) => {
    const todoToAdd = e.target.value;

    this.setState({
      inputError: false,
      title: todoToAdd,
    });
  };

  handleFormSubmit = (e) => {
    e.preventDefault();
    const { usedId, title } = this.state;

    if (+usedId === 0) {
      this.setState({ selectError: true });

      return;
    }

    if (title === '') {
      this.setState({ inputError: true });

      return;
    }

    this.props.updateMainState(usedId, title);
    this.setState({
      title: '',
      usedId: '0',
    });
  };

  render() {
    const { usersForSelection } = this.props;
    const users = usersForSelection
      .sort((a, b) => a.name.localeCompare(b.name))
      .map(user => (
        <option
          value={user.id}
          key={user.name}
        >
          {user.name}
        </option>
      ));

    return (
      <div>
        <div className="card blue-grey darken-1">
          <div className="card-content white-text">
            <span className="card-title">Choose a User</span>
            <form onSubmit={this.handleFormSubmit} className="form">
              {this.state.selectError && (
                <span
                  style={{ color: 'red' }}
                >
Please, select user
                </span>
              )}
              <select
                value={this.state.usedId}
                onChange={this.handleSetName}
                className="custom-select"
              >
                <option value="0">Select a user</option>
                {users}
              </select>
              <label htmlFor="Search">
                <input
                  onChange={this.handleSetTodoItem}
                  value={this.state.title}
                  placeholder="input TODO for adding"
                  type="text"
                  name="name"
                />
              </label>
              {this.state.inputError && (
                <span
                  style={{ color: 'red' }}
                >
Please, add Todo
                </span>
              )
              }
              <button
                className="btn waves-effect waves-light"
                type="submit"
                name="action"
              >
                Submit
                <i className="material-icons right">send</i>
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

Select.propTypes = {
  usersForSelection: PropTypes.arrayOf(PropTypes.object).isRequired,
  updateMainState: PropTypes.func.isRequired,
};
