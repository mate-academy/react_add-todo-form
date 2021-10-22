import React from 'react';

import './App.css';

import users from './api/users';
import todos from './api/todos';
import { TodoList } from './components/TodoList/TodoList';
import { User, Todo } from './types';

interface State {
  todos: Todo[],
  newTodoTitle: string,
  newTodoUserId: number,
  hasTitleError: boolean,
  hasUserError: boolean,
}

function getUserById(userId: number): User | null {
  return users.find(user => user.id === userId)
    || null;
}

const todosWithUser = todos.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

class App extends React.Component<{}, State> {
  state: State = {
    todos: todosWithUser,
    newTodoTitle: '',
    newTodoUserId: 0,
    hasTitleError: false,
    hasUserError: false,
  };

  handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    this.setState(state => {
      if (!state.newTodoTitle || !state.newTodoUserId) {
        return {
          ...state,
          hasTitleError: !state.newTodoTitle,
          hasUserError: !state.newTodoUserId,
        };
      }

      const maxId = Math.max(...state.todos.map(todo => todo.id));
      const todo: Todo = {
        userId: state.newTodoUserId,
        id: maxId + 1,
        title: state.newTodoTitle,
        completed: false,
        user: getUserById(state.newTodoUserId),
      };

      return {
        hasTitleError: false,
        newTodoTitle: '',

        hasUserError: false,
        newTodoUserId: 0,

        todos: [
          todo,
          ...state.todos,
        ],
      };
    });
  };

  handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      newTodoTitle: event.target.value,
      hasTitleError: false,
    });
  };

  handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({
      newTodoUserId: +event.target.value,
      hasUserError: false,
    });
  };

  render() {
    const {
      newTodoUserId,
      newTodoTitle,
      hasUserError,
      hasTitleError,
    } = this.state;

    return (
      <>
        <div className="p-8 max-w-md mx-auto pb-0">
          <form
            onSubmit={this.handleFormSubmit}
            className="p-4 shadow-md rounded-md text-left pt-6 text-base leading-6 font-bold"
            style={{ width: 400 }}
          >
            <h1 className="text-center">Add todo form</h1>
            <label className="block" htmlFor="title">
              <span className="text-gray-700">Title</span>
              <input
                value={newTodoTitle}
                onChange={this.handleTitleChange}
                className="form-input mt-1 block w-full"
                placeholder="Type here..."
                id="title"
              />
              { hasTitleError && (
                <span className="absolute flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                  Invalid title!
                </span>
              )}
            </label>
            <label htmlFor="select" className="block mt-5">
              <span className="text-gray-700">User</span>
              <select
                value={newTodoUserId}
                onChange={this.handleUserChange}
                id="select"
                className="form-select mt-1 block w-full text-gray-800"
              >
                <option
                  value="0"
                  defaultValue={0}
                  disabled
                >
                  Choose a user
                </option>
                {users.map(user => (
                  <option value={user.id} key={user.id}>{ user.name }</option>
                ))}
              </select>
              { hasUserError && (
                <span className="absolute flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                  Choose a user!
                </span>
              )}
            </label>
            <div className="block flex p-4 pt-8">
              <button type="submit" className="w-full bg-purple-500 text-white active:bg-purple-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150">Add todo</button>
            </div>
          </form>
        </div>

        <div className="container mx-auto">
          <TodoList todos={this.state.todos} />
        </div>
      </>

    );
  }
}

export default App;
