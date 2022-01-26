import React from 'react';
import './App.css';
import { TodoList } from './components/TodoList/TodoList';
import todosFromServer from './api/todos';
import users from './api/users';

const newTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: users.find(user => user.id === todo.userId) || null,
}));

type Props = {};

type State = {
  todos: Todo[],
  newTitle: string,
  selectedId: string,
  hasTitleError: boolean,
  hasUserSelectedError: boolean,
};

class App extends React.PureComponent<Props, State> {
  state: State = {
    todos: [...newTodos],
    newTitle: '',
    selectedId: '0',
    hasTitleError: false,
    hasUserSelectedError: false,
  };

  handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const regexp = /^[а-яА-Яa-zA-Z0-9\s,.'Ёё]+$/;

    if (regexp.test(value)) {
      this.setState((state) => ({
        ...state,
        newTitle: value,
        hasTitleError: false,
      }));
    } else if (value.length > 1) {
      this.setState((state) => ({
        newTitle: state.newTitle,
      }));
    } else {
      this.setState(() => ({
        newTitle: '',
      }));
    }
  };

  chooseUser = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState(() => ({
      selectedId: event.target.value,
      hasUserSelectedError: false,
    }));
  };

  handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { newTitle, selectedId } = this.state;

    const notSelected = selectedId === '0';

    if (!newTitle || notSelected) {
      this.setState({
        hasTitleError: !newTitle,
        hasUserSelectedError: notSelected,
      });

      return;
    }

    const newTodo = {
      title: this.state.newTitle,
      id: this.state.todos.length + 1,
      userId: users[+this.state.selectedId - 1].id,
      completed: true,
      user: users.find(user => +this.state.selectedId === user.id) || null,
    };

    this.setState((state) => ({
      todos: [
        ...state.todos,
        newTodo,
      ],
      newTitle: '',
      selectedId: '0',
    }));
  };

  render() {
    const {
      todos,
      newTitle,
      selectedId,
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

        <TodoList todoList={todos} />

        <form onSubmit={this.handleSubmit}>
          <input type="text" value={newTitle} onChange={this.handleInput} />

          {hasTitleError && (
            <span>Please type a title</span>
          )}

          <select value={selectedId} onChange={this.chooseUser}>
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
      </div>

    );
  }
}

export default App;
