import React from 'react';

import users from '../api/users';

type Props = {
  todos: PreparedTodo[];
  addTodo: (newTodo: PreparedTodo) => void;
};

type State = {
  newUserId: number,
  newTitle: string,
  titleError: boolean,
  userError: boolean,
};

export class AddTodoForm extends React.Component<Props, State> {
  state: State = {
    newUserId: 0,
    newTitle: '',
    titleError: false,
    userError: false,
  };

  handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      newTitle: event.target.value,
      titleError: false,
    });
  };

  handleNewUserId = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({
      newUserId: +event.target.value,
      userError: false,
    });
  };

  findNewUser = (userId: number) => {
    return users.find(user => user.id === userId) || null;
  };

  getNewTodo = () => {
    const { newUserId, newTitle } = this.state;
    const { todos } = this.props;

    const newTodo: PreparedTodo = {
      id: todos.length + 1,
      title: newTitle.trim(),
      completed: true,
      user: this.findNewUser(newUserId) || null,
    };

    return newTodo;
  };

  clearState = () => {
    this.setState({
      newUserId: 0,
      newTitle: '',
      titleError: false,
      userError: false,
    });
  };

  validateForm = () => {
    const { newTitle, newUserId } = this.state;

    if (!newTitle || !newUserId) {
      this.setState({
        titleError: !newTitle,
        userError: !newUserId,
      });

      return false;
    }

    return true;
  };

  handleSubmitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (this.validateForm()) {
      const newTodo = this.getNewTodo();

      this.props.addTodo(newTodo);
      this.clearState();
    }
  };

  render() {
    const {
      newUserId,
      newTitle,
      titleError,
      userError,
    } = this.state;

    return (
      <div className="box column is-half p-5">
        <h1 className="title">Add todo form</h1>
        <form
          className="control column is-half"
          onSubmit={this.handleSubmitForm}
        >
          <section className="block">
            <input
              type="text"
              className="input is-small"
              placeholder="Title"
              value={newTitle}
              onChange={this.handleTitleChange}
            />
            {titleError && (
              <span
                className="tag is-danger is-light"
              >
                Please enter the title
              </span>
            )}
          </section>

          <section className="select is-info is-small">
            <select
              value={newUserId}
              onChange={this.handleNewUserId}
            >
              <option value="0">Choose a user</option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>{user.name}</option>
              ))}
            </select>
            {userError && (
              <span
                className="tag is-danger is-light"
              >
                Please choose a user
              </span>
            )}
          </section>

          {' '}
          <button
            type="submit"
            className="button is-info is-small"
          >
            Add
          </button>
        </form>
      </div>
    );
  }
}
