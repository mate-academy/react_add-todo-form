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
    requireUserSelection: false,
    requireTitle: false,
  }

  handleSelect = (event) => {
    const newValue = event.target.value;
    this.setState({
      selectedUserId: newValue,
      requireUserSelection: !newValue,
    });
   }

  titleChanged = (event) => {
    const newTitle = event.target.value;
    this.setState({
      title: newTitle,
      requireTitle: !newTitle,
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { selectedUserId, title } = this.state;

    if (!selectedUserId || !title) {
      this.setState({
        requireUserSelection: !selectedUserId,
        requireTitle: !title,
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
      requireUserSelection,
      requireTitle,
    } = this.state;

    return (
      <form className="box" onSubmit={this.handleSubmit}>
        <div className={
          classnames('select', { 'is-danger': requireUserSelection })
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
        {requireUserSelection && (
          <span className="requireUserLabel help is-danger">
            Please choose a user
          </span>
        )}
        <input
          type="text"
          className={classnames(`input`, { 'is-danger': requireTitle })}
          value={title}
          onChange={this.titleChanged}
        />
        {requireTitle && (
          <span className="requireTitleLabel help is-danger">
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
