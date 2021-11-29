import React, { ChangeEvent, FormEvent } from 'react';
import './App.css';

import userList from './api/users';
import todoList from './api/todos';
import { Todo, User } from './types/type';
import { TodoList } from './components/TodoList/TodoList';

interface State {
  users: User[];
  todos: Todo[];
  isShowUserError: boolean;
  isShowTitleError: boolean;
  todoTitle: string;
  userId: number;
}

class App extends React.Component<{}, State> {
  state: State = {
    isShowTitleError: false,
    isShowUserError: false,
    todos: todoList,
    users: userList,
    todoTitle: '',
    userId: 0,
  };

  validateForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const userId = Number((event.currentTarget.elements.namedItem('userId') as HTMLInputElement).value);
    const todoTitle: string = (event.currentTarget.elements.namedItem('todoTitle') as HTMLInputElement).value;

    if (!todoTitle) {
      this.setState({ isShowTitleError: true });
    } else if (userId < 1) {
      this.setState({ isShowUserError: true });
    } else {
      this.addTodo(userId, todoTitle);
    }
  };

  addTodo = (userId: number, title: string) => {
    const newTodo: Todo = {
      userId,
      id: this.state.todos.length + 1,
      title,
      completed: false,
    };

    this.setState(prevState => ({
      todos: [...prevState.todos, newTodo],
      todoTitle: '',
      userId: 0,
    }));
  };

  handleEventTitle = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      todoTitle: e.target.value,
      isShowTitleError: false,
    });
  };

  handleEventUser = (e: ChangeEvent<HTMLSelectElement>) => {
    this.setState({
      userId: Number(e.target.value),
      isShowUserError: false,
    });
  };

  render() {
    const {
      todos,
      users,
      todoTitle,
      userId,
      isShowUserError,
      isShowTitleError,
    } = this.state;

    return (
      <div className="App">
        <h1>Add todo form</h1>

        <div>
          <h2>Todo list</h2>
          <TodoList todos={todos} />

          <h3>Create new TODO</h3>
          <form onSubmit={this.validateForm}>
            <label htmlFor="title">
              Title:
              <input
                type="text"
                value={todoTitle}
                name="todoTitle"
                onChange={this.handleEventTitle}
                placeholder="Enter the title of TODO"
              />
              {isShowTitleError && (
                <span className="error">Please enter the title</span>
              )}
            </label>

            <label htmlFor="user">
              User:
              <select
                name="userId"
                value={userId}
                onChange={this.handleEventUser}
              >
                <option value="0">Choose a user</option>
                {users.map(user => (
                  <option
                    key={user.id}
                    value={user.id}
                  >
                    {user.username}
                  </option>
                ))}
              </select>

              {isShowUserError && (
                <span className="error">Please choose a user</span>
              )}
            </label>

            <button type="submit">Add</button>
          </form>
        </div>
      </div>
    );
  }
}

export default App;
