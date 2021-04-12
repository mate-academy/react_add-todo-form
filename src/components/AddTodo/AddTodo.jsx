import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './AddTodo.css';
import { UserType } from '../../types';

export class AddTodo extends React.Component {
  state = {
    users: this.props.users,
    selectedUserId: '',
    title: '',
    isSelectionRequired: false,
    isTitleRequired: false,
  }

  handleSelect = (event) => {
    const newValue = event.target.value;

    this.setState({
      selectedUserId: newValue,
      isSelectionRequired: !newValue,
    });
  }

  titleChanged = (event) => {
    const newTitle = event.target.value;

    this.setState({
      title: newTitle,
      isTitleRequired: !newTitle,
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { selectedUserId, title } = this.state;

    if (!selectedUserId || !title) {
      this.setState({
        isSelectionRequired: !selectedUserId,
        isTitleRequired: !title,
      });

      return;
    }

    this.props.addTodo(+selectedUserId, title);

    this.setState({
      selectedUserId: 0,
      title: '',
    });
  }

  render() {
    const {
      title,
      selectedUserId,
      users,
      isSelectionRequired,
      isTitleRequired,
    } = this.state;

    return (
      <form className="box" onSubmit={this.handleSubmit}>
        <div className={
          classnames('select', { 'is-danger': isSelectionRequired })
          }
        >
          <select
            name="user"
            id="user"
            className="select"
            value={selectedUserId}
            onChange={this.handleSelect}
          >
            <option value="">Choose a user</option>
            {users.map(({ id, name }) => (
              <option
                key={id}
                value={id}
              >
                {name}
              </option>
            ))}
            ;
          </select>
        </div>
        {isSelectionRequired && (
          <span className="requireUserLabel help is-danger">
            Please choose a user
          </span>
        )}
        <input
          type="text"
          className={classnames(`input`, { 'is-danger': isTitleRequired })}
          value={title}
          onChange={this.titleChanged}
        />
        {isTitleRequired && (
          <span className="isTitleRequiredLabel help is-danger">
            Please enter the title
          </span>
        )}
        <button type="submit" className="button is-medium">Add</button>
      </form>
    );
  }
}

AddTodo.propTypes = {
  users: PropTypes.arrayOf(UserType),
  addTodo: PropTypes.func.isRequired,
};

AddTodo.defaultProps = {
  users: [],
};
