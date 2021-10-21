import React from 'react';
import { Todo, User } from './types';

interface Props {
  users: User[],
  todos: Todo[],
  addTodo: (todo:Todo) => void;
}

interface State {
  title: string,
  userId: number,
  titleError: boolean,
  userError: boolean,
}

export class TodoForm extends React.Component<Props, State> {
  state: State = {
    title: '',
    userId: 0,
    titleError: false,
    userError: false,
  };

  handleChangeSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({
      userId: +event.target.value,
      userError: false,
    });
  };

  handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const { userId, title } = this.state;

    if (!title) {
      this.setState({ titleError: true });
    }

    if (!userId) {
      this.setState({ userError: true });
    }

    if (userId && title) {
      const newTodo = {
        // userId,
        // id,
        title,
        user: this.findSelectedUser(),
      };

      this.props.addTodo(newTodo as Todo);
      this.setState({
        title: '',
        userId: 0,
      });
    }
  };

  handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      title: event.target.value,
      titleError: false,
    });
  };

  findSelectedUser = () => {
    return this.props.users.find(user => user.id === this.state.userId);
  };

  render() {
    const {
      title, userId, titleError, userError,
    } = this.state;
    const { users } = this.props;

    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          {titleError && (
            <span>Please, enter text</span>
          )}
        </div>
        <input
          type="text"
          placeholder="Enter a title"
          value={title}
          onChange={this.handleChangeInput}
        />
        <select value={userId} onChange={this.handleChangeSelect}>
          <option defaultValue="">Choose name</option>
          {users.map(user => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
        <div>
          {userError && (
            <span>Please, choose a user</span>
          )}
        </div>
        <button type="submit">Add Todo</button>
      </form>
    );
  }
}
