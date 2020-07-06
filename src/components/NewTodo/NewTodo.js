import React from 'react';
import { NewTodoShape } from '../Shapes/NewTodoShape';

export class NewTodo extends React.Component {
  state = {
    user: '',
    title: '',
    warning: '',
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const {
      todos,
      users,
      addTodo,
    } = this.props;

    const {
      title,
      selectedUser,
    } = event.target;

    if (title.value.length === 0) {
      this.setState({
        warning: 'Enter a todo, please',
      });

      return;
    }

    if (!selectedUser.value) {
      this.setState({
        warning: 'Select the user, please',
      });

      return;
    }

    if (!this.state.warning) {
      const newTodo = {
        id: todos.length + 1,
        title: title.value,
        userId: users[selectedUser.value].id,
        user: users[selectedUser.value],
        completed: false,
      };

      this.setState({
        title: '',
        user: '',
      });
      addTodo(newTodo);
    }
  };

  onChangeSelect = ({ target }) => {
    const { value } = target.value;

    this.setState({
      user: value,
      warning: null,
    });
  };

  onChangeInput = ({ target }) => {
    const { value } = target;

    this.setState({
      title: value,
      warning: null,
    });
  };

  render() {
    const { users } = this.props;
    const {
      title,
      user,
      warning,
    } = this.state;

    return (
      <form name="addTodo" className="addTodo" onSubmit={this.handleSubmit}>
        <label>
          Todo
          <input
            name="title"
            type="text"
            placeholder="Type here..."
            className="addTodo__input"
            value={title}
            onChange={this.onChangeInput}
          />
        </label>

        <label htmlFor="select">
          User
          <select
            name="selectedUser"
            id="selectedUser"
            className="addTodo__select"
            value={user}
            onChange={this.onChangeSelect}
          >
            <option value="">Select the user...</option>
            {users.map((userSelected, index) => (
              <option
                key={userSelected.id}
                value={index}
              >
                {userSelected.name}
              </option>
            ))}
          </select>
          {warning && (
            <div className="warning">{warning}</div>
          )}
        </label>

        <button type="submit">
          Add Todo
        </button>
      </form>
    );
  }
}

NewTodo.propTypes = NewTodoShape.isRequired;
