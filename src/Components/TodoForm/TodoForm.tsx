import React from 'react';
import { v4 as uuidv4 } from 'uuid';

interface Props {
  users: User[],
  todos: Todo[],
  addTodo: (todo:Todo) => void;
}

interface State {
  title: string;
  userId: number;
  titleError: boolean;
  userError: boolean;
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
    });
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

  resetState = () => {
    this.setState({
      title: '',
      userId: 0,
      titleError: false,
      userError: false,
    });
  };

  handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const { userId, title } = this.state;

    if (!title.trim()) {
      this.setState({ titleError: true });
    }

    if (!userId) {
      this.setState({ userError: true });
    }

    if (userId && title) {
      const newTodo = {
        userId,
        id: uuidv4(),
        title,
        user: this.findSelectedUser(),
      };

      this.props.addTodo(newTodo as Todo);
      this.resetState();
    }
  };

  render() {
    const {
      title,
      userId,
      titleError,
      userError,
    } = this.state;
    const { users } = this.props;

    return (
      <form
        className="d-flex justify-content-center flex-column mt-4 mb-4"
        onSubmit={this.handleSubmit}
      >
        <div className="d-flex justify-content-center align-items-center">
          <div>
            {titleError && (
              <div>Please, enter text</div>
            )}
          </div>
          <input
            className="form-control w-25"
            type="text"
            placeholder="Enter a title"
            value={title}
            onChange={this.handleChangeInput}
          />

          <select
            className="form-select w-25"
            value={userId}
            onChange={this.handleChangeSelect}
          >
            <option defaultValue="">
              Choose name
            </option>
            {users.map(user => (
              <option value={user.id} key={user.id}>
                {user.name}
              </option>
            ))}
          </select>
          <div>
            {userError && (
              <span>Please, choose a user</span>
            )}
          </div>
        </div>

        <div className="mt-4">
          <button
            type="submit"
            className="btn btn-secondary"
          >
            Add Todo
          </button>
        </div>
      </form>
    );
  }
}
