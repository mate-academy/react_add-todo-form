import React from 'react';
import './App.css';
import { TodoList } from './components/TodoList/TodoList';
import todosFromServer from './api/todos';
import users from './api/users';

const todosWithUser: TodoWithUser[] = todosFromServer.map(todo => ({
  ...todo,
  user: users.find(user => user.id === todo.userId) || null,
}));

type State = {
  todos: TodoWithUser[],
  newTitle: string,
  selectedUserId: string,
  hasTitleError: boolean,
  hasUserSelectedError: boolean,
};

class App extends React.PureComponent<{}, State> {
  state: State = {
    todos: [...todosWithUser],
    newTitle: '',
    selectedUserId: '0',
    hasTitleError: false,
    hasUserSelectedError: false,
  };

  handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const regexp = /^[а-яА-Яa-zA-Z0-9\s,.'Ёё]+$/;

    if (value && regexp.test(value)) {
      this.setState((state) => ({
        ...state,
        newTitle: value,
        hasTitleError: false,
      }));
    } else {
      this.setState({
        newTitle: '',
      });
    }
  };

  chooseUser = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState(() => ({
      selectedUserId: event.target.value,
      hasUserSelectedError: false,
    }));
  };

  handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { newTitle, selectedUserId } = this.state;

    const notSelectedUser = selectedUserId === '0';

    if (!newTitle || notSelectedUser) {
      this.setState({
        hasTitleError: !newTitle,
        hasUserSelectedError: notSelectedUser,
      });

      return;
    }

    const newTodo = {
      title: this.state.newTitle,
      id: this.state.todos.length + 1,
      userId: users[+this.state.selectedUserId - 1].id,
      completed: true,
      user: users.find(user => +this.state.selectedUserId === user.id) || null,
    };

    this.setState((state) => ({
      todos: [
        ...state.todos,
        newTodo,
      ],
      newTitle: '',
      selectedUserId: '0',
    }));
  };

  render() {
    const {
      todos,
      newTitle,
      selectedUserId,
      hasTitleError,
      hasUserSelectedError,
    } = this.state;

    return (
      <div className="App">
        <h1>Add todo form</h1>
        <p>
          <span>Users: </span>
          {users.length}
        </p>

        <form onSubmit={this.handleSubmit}>
          <input type="text" value={newTitle} onChange={this.handleInput} />

          {hasTitleError && (
            <span>Please type a title</span>
          )}

          <select value={selectedUserId} onChange={this.chooseUser}>
            <option value="0">Choose user</option>

            {users.map(user => (
              <option value={user.id}>{user.name}</option>
            ))}
          </select>

          {hasUserSelectedError && (
            <span>Please choose an user</span>
          )}

          <button type="submit"> Add User</button>
        </form>

        <TodoList todoList={todos} />
      </div>

    );
  }
}

export default App;
