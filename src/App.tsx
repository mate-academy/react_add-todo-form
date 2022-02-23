import React from 'react';
import './App.scss';

import serverTodos from './api/todos';
import serverUsers from './api/users';
import { TodoList } from './components/TodoList/TodoList';

const preparedTodos: Todo[] = serverTodos.map((todo) => ({
  ...todo,
  user: serverUsers.find((user) => user.id === todo.userId) || null,
}));

type Props = {};
type State = {
  currentUser: number,
  todoTitle: string,
  todos: Todo[],
  userError: string,
  titleError: string,
};

class App extends React.Component<Props, State> {
  state: State = {
    currentUser: 0,
    todoTitle: '',
    todos: preparedTodos,
    userError: '',
    titleError: '',
  };

  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    this.addTodo();
    this.setState({ todoTitle: '', currentUser: 0 });
  };

  handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ todoTitle: event.target.value, titleError: '' });
  };

  handleUser = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({ currentUser: +event.target.value, userError: '' });
  };

  addTodo() {
    const todo: Todo = {
      userId: 0,
      id: 0,
      title: '',
      completed: false,
      user: null,
    };

    todo.userId = this.state.currentUser;
    todo.id = preparedTodos.length;
    todo.user = serverUsers.find((user) => user.id === todo.userId) || null;
    todo.title = this.state.todoTitle;

    if (todo.user !== null && todo.title.length > 0) {
      this.setState(state => ({ todos: [...state.todos, todo], userError: '' }));
    }

    if (todo.user === null) {
      this.setState({ userError: 'Please choose a user' });
    }

    if (todo.title.length === 0) {
      this.setState({ titleError: 'Please enter the title' });
    }
  }

  render() {
    return (
      <div className="App">
        <h1 className="App__title">Add todo form</h1>
        <form
          onSubmit={this.handleSubmit}
          className="App__form"
        >
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={this.state.todoTitle}
            onChange={this.handleTitle}
            className="App__input"
          />
          {this.state.titleError}
          <select
            name="users"
            value={this.state.currentUser}
            onChange={this.handleUser}
            className="App__input"
          >
            <option value="">Choose a user</option>
            {serverUsers.map((user) => {
              return (
                <option value={user.id}>{user.name}</option>
              );
            })}
          </select>
          {this.state.userError}
          <button
            type="submit"
            className="App__input"
          >
            Add
          </button>
        </form>

        <p>
          <span className="App__list-title">Users: </span>
          <TodoList todos={this.state.todos} />
        </p>
      </div>
    );
  }
}

export default App;
