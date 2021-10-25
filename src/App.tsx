import React from 'react';
import './App.css';
import { TodoList } from './components/TodoList';
import todos from './api/todos';
import users from './api/users';
import { Todo } from './types/TodoType';

export const preparedTodos = todos.map(todo => ({
  ...todo,
  user: users.find(person => person.id === todo.userId),
}));

type State = {
  todosFromState: Todo[];
  newName: number;
  newTitle: string;
  showTitleAlert: boolean;
  showUserAlert: boolean;
};

class App extends React.Component<{}, State> {
  state: State = {
    todosFromState: [...todos],
    newName: 0,
    newTitle: '',
    showTitleAlert: false,
    showUserAlert: false,
  };

  validateForm = () => {
    if (this.state.newName < 1) {
      this.setState({ showUserAlert: true });
    } else if (this.state.newTitle.trim().length < 1) {
      this.setState({ showTitleAlert: true });
    }
  };

  addTodo = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    this.validateForm();
    const { newTitle, newName } = this.state;

    if (newTitle.trim().length > 0 && newName > 0) {
      const newTodo = {
        userId: newName,
        id: +(new Date()),
        title: newTitle,
        completed: false,
      };

      this.setState((prevState) => {
        return { todosFromState: [...prevState.todosFromState, newTodo], newName: 0, newTitle: '' };
      });

      event.target.reset();
    }
  };

  render() {
    return (
      <div className="App">
        <div className="heading">
          <div
            hidden={!this.state.showTitleAlert}
            className="warning notification"
          >
            Please enter the title
          </div>
          <div
            hidden={!this.state.showUserAlert}
            className="warning notification"
          >
            Choose a user
          </div>
          <div
            className="add__todo notification"
          >
            Add a new Todo
          </div>
        </div>
        <form
          action="POST"
          onSubmit={this.addTodo}
        >
          <input
            className="field"
            type="text"
            name="newTitle"
            placeholder="Title"
            onChange={(event) => {
              this.setState({ newTitle: event.target.value, showTitleAlert: false });
            }}
          />
          <select
            className="field"
            name="userID"
            id="userID"
            onChange={(event) => {
              this.setState({ newName: +event.target.value, showUserAlert: false });
            }}
          >
            <option>
              Choose a user
            </option>
            {users.map(user => {
              return (
                <option
                  key={user.id}
                  value={user.id}
                >
                  {user.name}
                </option>
              );
            })}
          </select>
          <button type="submit">Submit</button>
        </form>
        <TodoList todos={this.state.todosFromState} />
      </div>
    );
  }
}

export default App;
