import React from 'react';
import users from '../api/users';
import { getUserById } from '../helpers';

type Props = {
  todo: TodoWithUser[],
  addNewTodo: (newTodo: TodoWithUser) => void,

};
type State = {
  newTitle: string,
  selectedUserId: number,
  hasTitleError: boolean,
  hasNameError: boolean,
};

export class AddTodoForm extends React.Component<Props, State> {
  state: State = {
    newTitle: '',
    selectedUserId: 0,
    hasTitleError: false,
    hasNameError: false,
  };

  handleNameChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({
      selectedUserId: +event.target.value,
      hasNameError: false,
    });
  };

  handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      newTitle: event.target.value,
      hasTitleError: false,
    });
  };

  getNewTodo = () => {
    const { newTitle, selectedUserId } = this.state;
    const { todo } = this.props;
    const newTodo: TodoWithUser = {
      id: todo.length + 1,
      title: newTitle,
      userId: selectedUserId,
      user: getUserById(selectedUserId) || null,
      completed: true,
    };

    return newTodo;
  };

  clearState = () => {
    this.setState({
      newTitle: '',
      selectedUserId: 0,
      hasTitleError: false,
      hasNameError: false,
    });
  };

  validateForm = () => {
    const { newTitle, selectedUserId } = this.state;

    if (!newTitle || !selectedUserId) {
      this.setState({
        hasTitleError: !newTitle,
        hasNameError: !selectedUserId,
      });

      return false;
    }

    return true;
  };

  handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    const isFormValid = this.validateForm();

    if (isFormValid) {
      const newTodo = this.getNewTodo();

      this.props.addNewTodo(newTodo);
      this.clearState();
    }
  };

  render() {
    const {
      newTitle,
      selectedUserId,
      hasTitleError,
      hasNameError,
    } = this.state;

    return (
      <form
        className="box"
        onSubmit={this.handleSubmit}
      >
        <section className="card-content">
          <input
            className="input is-primary"
            placeholder="Enter the title"
            type="text"
            value={newTitle}
            onChange={this.handleTitleChange}
          />
          {hasTitleError && (
            <span className="error">Please enter the title</span>
          )}
        </section>

        <section className="select is-primary content">
          <select
            value={selectedUserId}
            onChange={this.handleNameChange}
          >
            <option value="0">
              Choose a user
            </option>
            {users.map((user) => (
              <option
                value={user.id}
                key={user.id}
              >
                {user.name}
              </option>
            ))}
          </select>
          {hasNameError && (
            <span className="error">Please choose a user</span>
          )}
        </section>

        <button
          type="submit"
          className="button is-primary"
        >
          Add
        </button>
      </form>
    );
  }
}
