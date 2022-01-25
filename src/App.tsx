import React from 'react';
import './App.css';

import users from './api/users';
import todos from './api/todos';
import { Todo } from './types/Todo';
import TodoList from './components/TodoList/TodoList';

type State = {
  todos: Todo[];
  userId: number;
  todoTitle: string;
  isValidUser: boolean;
  isValidTitle: boolean,
};

class App extends React.Component<{}, State> {
  state: State = {
    todos,
    userId: 0,
    todoTitle: '',
    isValidUser: true,
    isValidTitle: true,
  };

  handleUserChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({
      userId: +e.currentTarget.value,
      isValidUser: true,
    });
  };

  handletodoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.value.match(/[^a-zа-я0-9 ]/i)) {
      return;
    }

    this.setState({
      todoTitle: e.currentTarget.value,
      isValidTitle: true,
    });
  };

  handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const {
      todoTitle,
      userId,
    } = this.state;

    if (userId && todoTitle.length) {
      this.setState((state) => ({
        todos: [
          ...state.todos,
          {
            userId: +state.userId,
            id: state.todos[state.todos.length - 1].id + 1,
            title: state.todoTitle,
            completed: false,
          },
        ],
        userId: 0,
        todoTitle: '',
        isValidUser: true,
        isValidTitle: true,
      }));
    } else {
      this.showErrors();
    }
  };

  showErrors = () => {
    const {
      todoTitle,
      userId,
    } = this.state;

    if (!todoTitle.length) {
      this.setState({
        isValidTitle: false,
      });
    }

    if (!userId) {
      this.setState({
        isValidUser: false,
      });
    }
  };

  render() {
    const {
      todoTitle,
      userId,
      isValidTitle,
      isValidUser,
    } = this.state;

    return (
      <div className="App">
        <form
          onSubmit={this.handleSubmit}
        >
          <input
            type="text"
            placeholder="Todo"
            value={todoTitle}
            onChange={this.handletodoChange}
          />
          {!isValidTitle
            && <span>Please enter the title</span>}
          <select
            value={userId}
            onChange={this.handleUserChange}
          >
            <option value="0">
              Choose a user
            </option>
            {users.map((user) => (
              <option
                key={user.id}
                value={user.id}
              >
                {user.name}
              </option>
            ))}
          </select>
          {!isValidUser
            && <span>Please choose a user</span>}
          <button
            type="submit"
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
