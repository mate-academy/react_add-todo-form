import React from 'react';
import './App.css';

import users from './api/users';
import importedTodos from './api/todos';

interface Todo {
  userId: number;
  id: number;
  title: string;
}

interface User {
  id: number;
  name: string;
}

interface TodoWithUser extends Todo {
  user: User | null;
}

type State = {
  todos: TodoWithUser[];
  newTaskTitle: string;
  newTaskUserId: number;
  hasTaskTitleError: boolean;
  hasTaskUserIdError: boolean;
};

const todosWithUser = importedTodos.map(todoItem => ({
  ...todoItem,
  user: users.find(user => user.id === todoItem.userId) || null,
}));

class App extends React.Component<{}, State> {
  state: State = {
    todos: todosWithUser,
    newTaskTitle: '',
    newTaskUserId: 0,
    hasTaskTitleError: false,
    hasTaskUserIdError: false,
  };

  handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    this.setState(state => {
      if (!state.newTaskTitle || !state.newTaskUserId) {
        return {
          ...state,
          hasTaskTitleError: state.newTaskTitle === '',
          hasTaskUserIdError: state.newTaskUserId === 0,
        };
      }

      const maxId = Math.max(...state.todos.map(todo => todo.id));

      const newTodo: TodoWithUser = {
        id: maxId + 1,
        title: state.newTaskTitle,
        userId: state.newTaskUserId,
        user: users.find(user => user.id === state.newTaskUserId) || null,
      };

      return {
        todos: [
          newTodo,
          ...state.todos,
        ],
        newTaskTitle: '',
        newTaskUserId: 0,

        hasTaskTitleError: false,
        hasTaskUserIdError: false,
      };
    });
  };

  newTaskTitleFieldHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      newTaskTitle: event.currentTarget.value,
      hasTaskTitleError: false,
    });
  };

  newTaskUserIdSelectorHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({
      newTaskUserId: +event.currentTarget.value,
      hasTaskUserIdError: false,
    });
  };

  render() {
    return (
      <div className="App">
        <h1>Add todo form</h1>
        <form
          onSubmit={this.handleFormSubmit}
          method="get"
        >
          <div>
            <input
              type="text"
              name="taskTitle"
              value={this.state.newTaskTitle}
              placeholder="Enter task title"
              onChange={this.newTaskTitleFieldHandler}
            />
            {this.state.hasTaskTitleError && (
              <span className="error">
                Please enter the title
              </span>
            )}
          </div>
          <div>
            <select
              name="userId"
              value={this.state.newTaskUserId}
              onChange={this.newTaskUserIdSelectorHandler}
            >
              <option
                value="0"
                disabled
              >
                Choose user
              </option>
              {users.map((user: User) => (
                <option value={user.id} key={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
            {this.state.hasTaskUserIdError && (
              <span className="error">
                Please choose a user
              </span>
            )}
          </div>
          <button
            type="submit"
          >
            Add
          </button>
        </form>

        <ul className="TasksList">
          {this.state.todos.map((todo: TodoWithUser) => (
            <li className="TasksList__item" key={todo.id}>
              <div>
                {`Task title: ${todo.title}`}
              </div>
              <div>
                {`User: ${todo.user?.name}`}
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default App;
