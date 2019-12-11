import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Select extends Component {
  state = {
    chosenUser: 'Select a user',
    usedId: 0,
    title: '',
  };

  handleSetName =(e) => {
    const chooseName = e.target.value;

    this.setState({
      chosenUser: chooseName,
      usedId: this.props.usersForSelection
        .find(user => user.name === chooseName).id,
    });
  };

  handleSetTodoItem = (e) => {
    const todoToAdd = e.target.value;

    this.setState({ title: todoToAdd });
  };

  handleFormSubmit = (e) => {
    e.preventDefault();
    const { usedId, title } = this.state;

    if (!usedId) {
      return;
    }

    this.props.updateMainState(usedId, title);
    this.setState({
      chosenUser: 'Select a user',
      title: '',
      usedId: 0,
    });
  };

  render() {
    const { usersForSelection } = this.props;
    const users = usersForSelection
      .sort((a, b) => a.name.localeCompare(b.name))
      .map(user => (
        <option
          key={user.name}
        >
          {user.name}
        </option>
      ));

    return (
      <div className="card blue-grey darken-1">
        <div className="card-content white-text">
          <span className="card-title">Choose a User</span>
          <form onSubmit={this.handleFormSubmit} className="form">
            <select
              value={this.state.chosenUser}
              onChange={this.handleSetName}
              className="custom-select"
            >
              <option>Select a user</option>
              {users}
            </select>
            <label htmlFor="Search">
              <input
                onChange={this.handleSetTodoItem}
                value={this.state.title}
                placeholder="input TODO for adding"
                type="text"
                name="name"
                required
              />
            </label>
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

    );
  }
}

Select.propTypes = {
  usersForSelection: PropTypes.arrayOf(PropTypes.object).isRequired,
  updateMainState: PropTypes.func.isRequired,
};
