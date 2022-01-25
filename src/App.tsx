import React from 'react';
import './App.css';

import users from './api/users';
import todos from './api/todos';
import { Todo } from './types/Todo';
import TodoList from './components/TodoList/TodoList';

type State = {
  todos: Todo[];
  selectedUserId: string;
  todoDescription: string;
  isUnselectedUser: boolean;
};

class App extends React.Component<{}, State> {
  state: State = {
    todos,
    selectedUserId: '0',
    todoDescription: '',
    isUnselectedUser: false,
  };

  handleUserChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({
      selectedUserId: e.currentTarget.value,
    });
  };

  handletodoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.value.match(/[^a-zа-я0-9 ]/i)) {
      return;
    }

    this.setState({
      todoDescription: e.currentTarget.value,
    });
  };

  handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (this.state.selectedUserId === '0') {
      this.setState({
        isUnselectedUser: true,
      });

      return;
    }

    this.setState((state) => ({
      todos: [
        ...state.todos,
        {
          userId: +state.selectedUserId,
          id: state.todos[state.todos.length - 1].id + 1,
          title: state.todoDescription,
          completed: false,
        },
      ],
      selectedUserId: '0',
      todoDescription: '',
      isUnselectedUser: false,
    }));
  };

  render() {
    return (
      <div className="App">
        <form
          onSubmit={this.handleSubmit}
        >
          <input
            type="text"
            required
            placeholder="Todo"
            value={this.state.todoDescription}
            onChange={this.handletodoChange}
          />
          <select
            value={this.state.selectedUserId}
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
          {this.state.isUnselectedUser
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
