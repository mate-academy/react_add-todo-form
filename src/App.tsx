import React from 'react';
import './App.css';
import users from './api/users';
import todos from './api/todos';

type Todo = {
  userId: number | undefined;
  id: number;
  title: string;
  completed: boolean;
};

type User = {
  name: string;
};

type State = {
  todos: Todo[];
  users: User[];
  newTodoTitle: string;
  user: number;
  inputTodoError: boolean;
  selectUserError: boolean;
};

class App extends React.Component<{}, State> {
  state = {
    todos: [...todos],
    users: [...users],
    newTodoTitle: '',
    user: 0,
    inputTodoError: false,
    selectUserError: false,
  };

  render() {
    return (
      <div className="App">
        <h1>Add todo form</h1>

        <form onSubmit={(event) => {
          event.preventDefault();

          if (!this.state.newTodoTitle) {
            this.setState({ inputTodoError: true });

            return;
          }

          if (!this.state.user) {
            this.setState({ selectUserError: true });

            return;
          }

          this.setState(state => {
            const maxId = Math.max(...state.todos.map(el => el.id));

            const newTodo = {
              userId: users.find(user => user.id === this.state.user)?.id,
              id: maxId + 1,
              title: this.state.newTodoTitle,
              completed: false,
            };

            return {
              newTodoTitle: '',
              user: 0,
              todos: [
                ...state.todos,
                newTodo,
              ],
            };
          });
        }}
        >
          <div>
            <input
              name="new todo"
              type="text"
              placeholder="new todo"
              value={this.state.newTodoTitle}
              onChange={(event) => {
                this.setState({
                  newTodoTitle: event.target.value,
                  inputTodoError: false,
                });
              }}
            />
            {this.state.inputTodoError && <span>Enter the title</span>}
          </div>

          <div>
            <select
              name="person"
              id="selectPerson"
              value={this.state.user}
              onChange={(event) => {
                this.setState({
                  user: +event.target.value,
                  selectUserError: false,
                });
              }}
            >
              <option value={0}>
                Choose a user
              </option>
              {this.state.users.map(user => (
                <option
                  value={user.id}
                  key={user.id}
                >
                  {user.name}
                </option>
              ))}
            </select>
            {this.state.selectUserError && <span>Choose the user</span>}
          </div>

          <button
            type="submit"
          >
            Add
          </button>
        </form>

        <div>
          <ul>
            {this.state.todos.map(el => (
              <li key={el.id}>
                {el.title}
                <br />
                {this.state.users.find(user => user.id === el.userId)?.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default App;
