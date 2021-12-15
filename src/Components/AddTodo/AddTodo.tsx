import React from 'react';
import './AddTodo.scss';

import { User, Todo } from '../../types';

interface Props {
  users: User[];
  todos: Todo[];
  addTodo: (todo: Todo) => void,
}

interface State {
  userId: number;
  title: string;
  titleError: string;
  userError: string;
}

export class AddTodo extends React.Component<Props, State> {
  state: State = {
    userId: 0,
    title: '',
    titleError: '',
    userError: '',
  };

  resetForm = () => {
    this.setState({
      userId: 0,
      title: '',
      titleError: '',
      userError: '',
    });
  };

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      title: event.target.value,
      titleError: '',
    });
  };

  handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({
      userId: +event.target.value,
      userError: '',
    });
  };

  handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const { userId, title } = this.state;

    if (title.trim().length === 0) {
      this.setState({ titleError: 'Please, enter valid title' });

      return;
    }

    if (userId === 0) {
      this.setState({ userError: 'Please, choose user' });

      return;
    }

    const newTodo = {
      userId,
      id: this.props.todos.length + 1,
      title,
      user: this.props.users.find(user => user.id === this.state.userId),
    };

    this.props.addTodo(newTodo);
    this.resetForm();
  };

  render() {
    const { users } = this.props;
    const {
      userId,
      title,
      titleError,
      userError,
    } = this.state;

    return (
      <form
        className="addTodo"
        onSubmit={this.handleSubmit}
      >
        <label htmlFor="title">
          <input
            className="addTodo__title"
            type="text"
            name="title"
            id="title"
            placeholder="Enter a title"
            value={title}
            onChange={this.handleChange}
          />
          {titleError && (
            <span className="addTodo__Error">
              {titleError}
            </span>
          )}
        </label>

        <label htmlFor="username">
          <select
            className="addTodo__username"
            name="username"
            id="username"
            value={userId}
            onChange={this.handleSelectChange}
          >
            <option value="">
              Select a User
            </option>
            {users.map(user => (
              <option value={user.id} key={user.id}>
                {user.name}
              </option>
            ))}
          </select>
          {userError && (
            <span className="addTodo__Error">
              {userError}
            </span>
          )}
        </label>
        <button
          type="submit"
          className="addTodo__button"
        >
          Add
        </button>
      </form>
    );
  }
}
