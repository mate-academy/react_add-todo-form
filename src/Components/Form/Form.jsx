/* eslint-disable no-nested-ternary */
import React from 'react';
import PropTypes from 'prop-types';

export class Form extends React.Component {
  state = {
    users: this.props.usersFromServer,
    executor: '',
    titleTodo: '',
    visibilitySelectedUser: false,
    visibleMesaage: false,
  }

  handleSubmit = (event) => {
    const { users, executor, titleTodo } = this.state;
    const { addTodo } = this.props;
    const selectedUser = users.find(user => user.name === executor);

    event.preventDefault();

    if (!executor || !titleTodo) {
      this.setState({
        visibilitySelectedUser: !executor,
        visibleMesaage: !titleTodo,
      });

      return;
    }

    addTodo(selectedUser, titleTodo);

    this.setState({
      executor: '',
      titleTodo: '',
      visibilitySelectedUser: false,
      visibleMesaage: false,
    });
  };

  render() {
    const {
      users,
      executor,
      titleTodo,
      visibleMesaage,
      visibilitySelectedUser,
    } = this.state;

    return (
      <>
        {visibleMesaage
          ? (<span>Please, write a task for user</span>)
          : (visibilitySelectedUser
            ? (<span className="chooseUser">Please, choose a user</span>) : '')
        }

        <form onSubmit={this.handleSubmit}>
          <label
            htmlFor="title"
            className="itemForm"
          >
            <input
              id="title"
              name="title"
              type="text"
              placeholder="Input Tittle"
              value={titleTodo}
              onChange={event => this.setState({
                titleTodo: event.target.value.trimLeft(),
                visibleMesaage: false,
              })}
            />
          </label>

          <select
            value={executor}
            onChange={(event) => {
              this.setState({
                executor: event.target.value,
              });
            }}
            className="itemForm"
          >
            <option value="" disabled="disabled">Choose a user</option>
            {users.map(user => (
              <option
                key={user.i
                }
                name="name"
                value={user.name}
              >
                {user.name}
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={this.handleSubmit}
            className="itemForm"
          >
            Add TODO
          </button>
        </form>
      </>
    );
  }
}

Form.propTypes = {
  addTodo: PropTypes.func.isRequired,
  usersFromServer: PropTypes.arrayOf(PropTypes.object).isRequired,
};
