import React from 'react';

import users from '../api/users';

interface Props {
  addTodo: (title: string, userId: number) => void;
}

interface State {
  title: string;
  userId: number;
  isInvalidTitle: boolean;
  isInvalidUser: boolean;
}

export class NewTodoForm extends React.Component<Props, State> {
  state = {
    title: '',
    userId: 0,
    isInvalidTitle: false,
    isInvalidUser: false,
  };

  handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      title: event.target.value,
      isInvalidTitle: false,
    });
  };

  handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({
      userId: Number(event.target.value),
      isInvalidUser: false,
    });
  };

  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { title, userId } = this.state;
    const { addTodo } = this.props;

    this.setState({
      isInvalidTitle: !title,
      isInvalidUser: !userId,
    });

    if (title && userId) {
      addTodo(title, userId);

      this.setState({
        title: '',
        userId: 0,
      });
    }
  };

  render() {
    const {
      title, userId, isInvalidTitle, isInvalidUser,
    } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="title" className="App__label">
          Task
          <input
            type="text"
            name="title"
            id="title"
            value={title}
            placeholder="Task to add"
            onChange={this.handleTitleChange}
          />
        </label>
        {
          isInvalidTitle && (
            <div style={{ color: 'red' }}>
              Please enter the title
            </div>
          )
        }

        <label htmlFor="userId" className="App__label">
          User:
          <select
            name="users"
            id="userId"
            value={userId}
            onChange={this.handleUserChange}
          >
            <option value="0" disabled>Choose a user</option>

            {users.map(user => (
              <option
                value={user.id}
                key={user.id}
              >
                {user.name}
              </option>
            ))}
          </select>
        </label>
        {
          isInvalidUser && (
            <div style={{ color: 'red' }}>
              Please choose a user
            </div>
          )
        }

        <button
          type="submit"
        >
          Add task
        </button>
      </form>
    );
  }
}
