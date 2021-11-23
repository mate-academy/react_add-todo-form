import React from 'react';
import './App.css';

import userList from './api/users';
import todoList from './api/todos';
import { Todos, UserInformation } from './types/type';
import { TodoList } from './components/TodoList/TodoList';

interface State {
  users: UserInformation[];
  todos: Todos[];
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

  validateForm = (event: any) => {
    event.preventDefault();
    const { userId, todoTitle } = event.target.elements;

    if (!todoTitle.value) {
      this.setState({ isShowTitleError: true });
    } else if (userId.value < 1) {
      this.setState({ isShowUserError: true });
    } else {
      this.addTodo(userId.value, todoTitle.value);
    }
  };

  addTodo = (userId: number, title: string) => {
    const newTodo: Todos = {
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
                onChange={(event) => this.setState({
                  todoTitle: event.target.value,
                  isShowTitleError: false,
                })}
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
                id="user"
                onChange={(event) => this.setState({
                  userId: Number(event.target.value),
                  isShowUserError: false,
                })}
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
