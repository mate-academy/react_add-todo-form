import React from 'react';
import PropTypes from 'prop-types';

import { todosProps, usersProps } from '../../proptypes';

const style = {
  formStyle: {
    margin: '15px',
    padding: '15px',
    border: '1px solid lightgrey',
    borderRadius: '10px',
  },
  alertMessage: {
    color: 'red',
  },
};

export class TodoForm extends React.PureComponent {
  state ={
    selectedUser: '',
    titleText: '',
    completedTodo: false,
    buttonWasClicked: false,
  }

  handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    this.setState({ [name]: type === 'checkbox' ? checked : value });
  };

  handlerButton = () => {
    const { selectedUser, titleText, completedTodo }
      = this.state;
    const { todos, setTodos } = this.props;

    this.setState({ buttonWasClicked: true });

    if (selectedUser && titleText) {
      setTodos({
        userId: +selectedUser,
        id: todos.length + 1,
        title: titleText,
        completed: completedTodo,
      });

      this.setState({
        selectedUser: '',
        titleText: '',
        completedTodo: false,
        buttonWasClicked: false,
      });
    }
  }

  render() {
    const { users } = this.props;
    const { selectedUser } = this.state;

    return (
      <form className="mx-auto w-50" style={style.formStyle}>
        <select
          name="selectedUser"
          id="userName"
          className="form-select form-select-lg mb-1"
          value={selectedUser}
          onChange={event => this.handleChange(event)}
        >
          <option value="" disabled>Select User</option>
          {users.map(user => (
            <option value={user.id} key={user.id}>
              {user.name}
            </option>
          ))}
        </select>

        { ((this.state.buttonWasClicked && !this.state.selectedUser)
          && (
          <div className="d-flex mb-1" style={style.alertMessage}>
            Please enter the title
          </div>
          )
        )}

        <textarea
          className="form-control mb-1"
          name="titleText"
          id="title"
          placeholder="Write title"
          value={this.state.titleText}
          onChange={this.handleChange}
        />

        { ((this.state.buttonWasClicked && !this.state.titleText)
          && (
          <div className="d-flex mb-1" style={style.alertMessage}>
            Please enter the title
          </div>
          )
        )}
        <div className="form-check form-switch d-flex justify-content-start">
          <input
            className="form-check-input me-3"
            name="completedTodo"
            type="checkbox"
            id="flexSwitchCheckChecked"
            checked={this.state.completedTodo}
            onChange={this.handleChange}
          />
          <label
            className="form-check-label"
            htmlFor="flexSwitchCheckChecked"
          >
            Compleated
          </label>
        </div>

        <button
          type="button"
          className="btn btn-primary btn-lg"
          onClick={this.handlerButton}
        >
          Add
        </button>
      </form>
    );
  }
}

TodoForm.propTypes = {
  todos: PropTypes.arrayOf(todosProps).isRequired,
  users: PropTypes.arrayOf(usersProps).isRequired,
  setTodos: PropTypes.func.isRequired,
};
