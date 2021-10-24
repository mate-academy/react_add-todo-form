import React from 'react';
import './App.css';

import users from './api/users';
import { TodoList } from './components/TodoList';
import todosFromServer from './api/todos';
import { Todo } from './components/Todo';

type State = {
  todos: Todo[];
  newTitleName: string;
  hasTitleError: boolean;
  newUserId: number;
  hasUserError: boolean;
};

const preparedTodos = todosFromServer.map(todo => ({
  ...todo,
  user: users.find(user => user.id === todo.userId) || null,
}));

export class App extends React.Component<{}, State> {
  state: State = {
    todos: [...preparedTodos],
    newTitleName: '',
    hasTitleError: false,
    newUserId: 0,
    hasUserError: false,
  };

  addTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    this.setState(prevState => {
      if (!prevState.newTitleName || !prevState.newUserId) {
        return {
          ...prevState,
          hasTitleError: !prevState.newTitleName,
          hasUserError: !prevState.newUserId,
        };
      }

      const maxId = Math.max(...prevState.todos.map(todo => todo.id)) + 1;
      const user = users.find(u => u.id === prevState.newUserId);

      const newTodo:Todo = {
        userId: user?.id || null,
        id: maxId,
        title: prevState.newTitleName,
        completed: false,
        user,
      };

      return {
        todos: [
          newTodo,
          ...prevState.todos,
        ],
        hasTitleError: false,
        newTitleName: '',
        hasUserError: false,
        newUserId: 0,

      };
    });
  };

  handleTitleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    this.setState({
      newTitleName: event.target.value,
      hasTitleError: false,
    });
  };

  handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({
      newUserId: +event.target.value,
      hasUserError: false,
    });
  };

  render() {
    return (
      <div className="App">
        <h1>
          {this.state.newTitleName}
          -
          {this.state.newUserId}
        </h1>
        <form
          action=""
          onSubmit={this.addTodo}
        >
          Text:
          {/* eslint-disable-next-line */}
          <label htmlFor="">
            <input
              type="text"
              value={this.state.newTitleName}
              onChange={this.handleTitleChange}
            />
          </label>
          {this.state.hasTitleError ? <div>Error</div> : null}
          <select value={this.state.newUserId} onChange={this.handleUserChange}>
            <option value="0" disabled>Choose a user</option>
            {users.map(user => (
              <option key={user.id} value={user.id}>{user.name}</option>
            ))}
          </select>
          {this.state.hasUserError && <div>Error</div>}
          <button type="submit">Add task</button>
        </form>
        <div>
          <TodoList todos={this.state.todos} />
        </div>
      </div>
    );
  }
}
export default App;
