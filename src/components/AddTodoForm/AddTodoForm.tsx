import React from 'react';
import users from '../../api/users';
import { getUserById } from '../../helpers';

type Props = {
  todos: TodoWithUser[];
  addNewTodo: (newTodo: TodoWithUser) => void;
};

type State = {
  newTodoTitle: string;
  selectedUserId: number;
  hasTitleError: boolean;
  hasUserError: boolean;
};

export class AddTodoForm extends React.Component<Props, State> {
  state: State = {
    newTodoTitle: '',
    selectedUserId: 0,
    hasTitleError: false,
    hasUserError: false,
  };

  handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      newTodoTitle: event.target.value,
      hasTitleError: false,
    });
  };

  handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({
      selectedUserId: +event.target.value,
      hasUserError: false,
    });
  };

  getNewTodo = () => {
    const { newTodoTitle, selectedUserId } = this.state;
    const { todos } = this.props;

    const newTodo: TodoWithUser = {
      id: todos.length + 1,
      title: newTodoTitle,
      userId: selectedUserId,
      user: getUserById(selectedUserId) || null,
      completed: false,
    };

    return newTodo;
  };

  clearState = () => {
    this.setState({
      newTodoTitle: '',
      selectedUserId: 0,
      hasUserError: false,
      hasTitleError: false,
    });
  };

  validateForm = () => {
    const { newTodoTitle, selectedUserId } = this.state;

    if (!newTodoTitle || !selectedUserId) {
      this.setState({
        hasTitleError: !newTodoTitle,
        hasUserError: !selectedUserId,
      });

      return false;
    }

    return true;
  };

  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
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
      newTodoTitle, selectedUserId, hasTitleError, hasUserError,
    } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <section>
          <input
            type="text"
            value={newTodoTitle}
            onChange={this.handleTitleChange}
            placeholder="Enter the title"
          />
          {hasTitleError && (
            <span>Please enter the title</span>
          )}
        </section>

        <section>
          <select
            value={selectedUserId}
            onChange={this.handleUserChange}
          >
            <option value="0">Please choose a user</option>
            {users.map(user => (
              <option key={user.id} value={user.id}>{user.name}</option>
            ))}
          </select>
          {hasUserError && (
            <span>Please choose a user</span>
          )}
        </section>

        <button type="submit">Add</button>
      </form>
    );
  }
}
