import React from 'react';
import './App.scss';

import todos from './api/todos';
import users from './api/users';
import { TodoList } from './Components/TodoList';

type State = {
  todos: Todo[],
  title: string,
  userName: string,
  // titleError: string,
  // userError: string,
};

class App extends React.Component<{}, State> {
  state: State = {
    todos: [...todos],
    title: '',
    userName: '',
    // titleError: '',
    // userError: '',
  };

  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  handleChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    this.setState({ title: value });
  };

  handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    this.setState({ userName: value });
  };

  addTodo = () => {
    const { title, userName } = this.state;
    const newId = this.state.todos.length + 1;
    const newUser: User | null = users.find(user => user.name === userName) || null;

    if (!newUser) {
      return;
    }

    const newTodo = {
      userId: newUser.id,
      id: newId,
      completed: false,
      user: newUser,
      title,
    };

    this.setState((state) => ({
      todos: [...state.todos, newTodo],
      title: '',
      userName: '',
    }));
  };

  render() {
    const { title, userName } = this.state;

    return (
      <div className="app">
        <h1 className="app__title">Todos form</h1>
        <form
          action="post"
          onSubmit={this.handleSubmit}
        >
          <input
            type="text"
            placeholder="Enter your todo"
            value={title}
            onChange={this.handleChangeTitle}
          />
          <select
            name="user"
            value={userName}
            onChange={this.handleSelect}
          >
            <option>
              Please choose a user
            </option>
            {users.map((user) => (
              <option key={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          <button
            type="submit"
            onClick={this.addTodo}
          >
            Add
          </button>
        </form>

        <TodoList todos={this.state.todos} />
      </div>
    );
  }
}

export default App;
