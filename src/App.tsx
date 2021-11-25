import React from 'react';
import './App.css';

import users from './api/users';
import todos from './api/todos';
import { UsersList } from './types/UserList';
import TodoList from './components/TodoList';

type State = {
  users: UsersList[];
  newPost: {
    userId: number;
    id: number;
    title: string;
    user: {
      name: string;
    }
  }
};

const preparedTodos: UsersList[] = todos.map(todo => {
  const newUser = users.find(user => user.id === todo.userId);

  return { ...todo, user: newUser };
});

class App extends React.Component<{}, State> {
  state = {
    users: preparedTodos,
    newPost: {
      userId: 0,
      id: 0,
      title: '',
      user: {
        name: '',
      },
    },
  };

  handleSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    const newPost = {
      userId: this.state.users.length + 1,
      id: this.state.users.length + 1,
      title: this.state.newPost.title,
      user: {
        name: this.state.newPost.user.name,
      },
    };

    this.setState(state => ({
      ...state,
      users: [...state.users, newPost],
    }));

    this.setState({
      newPost: {
        userId: 0,
        id: 0,
        title: '',
        user: {
          name: '',
        },
      },
    });
  };

  render() {
    return (
      <>
        <form onSubmit={this.handleSubmit}>
          <select
            value={this.state.newPost.user.name}
            onChange={(event) => {
              this.setState(state => ({
                newPost: {
                  ...state.newPost,
                  user: {
                    name: event.target.value,
                  },
                },
              }));
            }}
            required
          >
            <option value="" disabled>
              Choose a user
            </option>
            {users.map(user => (
              <option value={user.name} key={user.id}>
                {user.name}
              </option>
            ))}
          </select>
          <input
            type="text"
            value={this.state.newPost.title}
            onChange={(event) => {
              this.setState(state => ({
                newPost: {
                  ...state.newPost,
                  title: event.target.value,
                },
              }));
            }}
            required
          />
          <button
            type="submit"
            onClick={() => {
              if (!this.state.newPost.title) {
                <h1>
                  Неработает
                </h1>;
              }
            }}
          >
            Add
          </button>
        </form>
        <br />
        <TodoList allUsers={this.state.users} />
      </>
    );
  }
}

export default App;
