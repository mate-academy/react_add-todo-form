import React from 'react';
import './App.scss';
import { TodoList } from './components/TodosList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

const prepearedTodo = todosFromServer.map(todo => ({
  ...todo,
  user: usersFromServer.find(user => user.id === todo.userId),
}
));

interface State {
  todos: Todo[];
  newTodo: string;
  selectedUser: string;
  titleError: boolean;
  userError: boolean;
}
class App extends React.Component {
  state: State = {
    todos: prepearedTodo,
    newTodo: '',
    selectedUser: '0',
    titleError: false,
    userError: false,
  };

  handleChangeSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({
      selectedUser: event.target.value,
    });
  };

  handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      newTodo: event.target.value,
    });
  };

  addTodo = (event: React.SyntheticEvent) => {
    event.preventDefault();

    if (this.state.newTodo === '') {
      this.state.titleError = true;
      this.forceUpdate();

      return;
    }

    if (this.state.selectedUser === '0') {
      this.state.titleError = false;
      this.state.userError = true;
      this.forceUpdate();

      return;
    }

    this.setState((prevState: State) => ({
      titleError: false,
      userError: false,
      newTodo: '',
      selectedUser: '0',
      todos: [
        ...prevState.todos,
        {
          title: prevState.newTodo,
          id: prevState.todos[prevState.todos.length - 1].id + 1,
          user: usersFromServer.find((user) => user.name === prevState.selectedUser),
        },
      ],
    }));
  };

  render() {
    const {
      todos,
      newTodo,
      selectedUser,
      titleError,
      userError,
    } = this.state;

    /* eslint-disable-next-line  */
    console.log(todos);

    return (
      <div className="App">
        <h1>Add todo form</h1>
        <form className="row gx-3 gy-2 align-items-center" onSubmit={this.addTodo}>
          <div className="col-auto">
            <input
              className="form-control"
              placeholder="Enter a title"
              type="text"
              name="todoInput"
              value={newTodo}
              onChange={this.handleChangeInput}
              pattern="^[A-Za-zА-Яа-яЁё0-9\s]+$"
            />
          </div>
          <div className="col-auto">
            <select
              className="form-select"
              value={selectedUser}
              onChange={this.handleChangeSelect}
            >
              <option value="">
                Choose a user
              </option>
              {usersFromServer.map((user) => (
                <option key={user.id} value={user.name}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>
          <div className="Error">
            {titleError && <div className="Error__message">Please enter the title</div>}
            {userError && <div className="Error__message">Please chose a user</div>}
          </div>
          <div className="col-auto">
            <button className="btn btn-primary btn-lg" type="submit">Add</button>
          </div>
        </form>
        <div className="Todolist">
          <TodoList todos={todos} />
        </div>
      </div>
    );
  }
}

export default App;
