import React from 'react';
import './App.css';

import usersApi from './api/users';
import todosApi from './api/todos';
import { UsersList } from './types/UserList';
import TodoList from './components/TodoList';
import { User } from './types/User';

type State = {
  users: User[];
  todos: UsersList[];
  choosenUser: string;
  newPost: UsersList;
};

const preparedTodos: UsersList[] = todosApi.map((todo) => {
  const newUser = usersApi.find((user) => user.id === todo.userId);

  return { ...todo, user: newUser };
});

class App extends React.Component<{}, State> {
  state = {
    users: usersApi,
    todos: preparedTodos,
    choosenUser: '',
    newPost: {
      userId: 0,
      id: 0,
      title: '',
      user: undefined,
    },
  };

  handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();

    if (!this.state.newPost.title.trim()) {
      return;
    }

    const newTodo: UsersList = {
      userId: this.state.newPost.userId,
      id: +(new Date()),
      title: this.state.newPost.title,
      user: this.state.newPost.user,
    };

    this.setState((state) => ({
      ...state,
      todos: [...state.todos, newTodo],
      newPost: {
        userId: 0,
        id: 0,
        title: '',
        user: undefined,
      },
    }));
  };

  render() {
    const { users, todos, choosenUser } = this.state;
    const { title } = this.state.newPost;

    return (
      <>
        <form onSubmit={this.handleSubmit}>
          <select
            value={choosenUser}
            onChange={(event) => {
              const newUser = this.state.users.find(
                (item) => item.name === event.target.value,
              );

              if (newUser) {
                this.setState((state) => ({
                  ...state,
                  choosenUser: newUser.name,
                  newPost: {
                    ...state.newPost,
                    userId: newUser.id,
                    user: newUser,
                  },
                }));
              }
            }}
            required
          >
            <option value="" disabled>
              Choose a user
            </option>
            {users.map((user) => (
              <option value={user.name} key={user.id}>
                {user.name}
              </option>
            ))}
          </select>
          <input
            type="text"
            value={title}
            onChange={(event) => {
              this.setState((state) => ({
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
          >
            Add
          </button>
        </form>
        <br />
        <TodoList allTodos={todos} />
      </>
    );
  }
}

export default App;
