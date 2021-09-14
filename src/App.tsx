/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import './App.css';
import todosFromServer from './api/todos';
import users from './api/users';
import { TodoList } from './components/TodoList/TodoList';

const preparedData: Todo[] = todosFromServer.map((todo) => ({
  ...todo,
  user: users.find((user) => user.id === todo.userId) || null,
}));

type State = {
  todos: Todo[];
  title: string;
  userId: number;
  userSelected: boolean;
  titleSelected: boolean;
};

class App extends React.Component<{}, State> {
  state = {
    todos: preparedData,
    title: '',
    userId: 0,
    userSelected: false,
    titleSelected: false,
  };

  addTodo = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    const { userId, title } = this.state;

    if (userId === 0) {
      this.setState({ userSelected: false });

      return;
    }

    if (title.length === 0) {
      this.setState({ titleSelected: false });

      return;
    }

    this.setState(prevState => {
      const createdTodo = {
        user: users.find(user => user.id === userId) || null,
        userId,
        id: prevState.todos.length + 1,
        title,
        completed: false,
      };

      return {
        todos: [...prevState.todos, createdTodo],
        userId: 0,
        title: '',
      };
    });
  };

  addTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    this.setState({
      title: value,
      titleSelected: true,
    });
  };

  selectUser = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    this.setState({
      userId: +value,
      userSelected: true,
    });
  };

  render() {
    return (
      <div className="App">
        <h1>Add todo form</h1>

        <form onSubmit={this.addTodo}>

          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Enter title
            </label>

            <input
              type="text"
              id="title"
              className="form-control"
              name="title"
              onChange={this.addTitle}
              value={this.state.title}
              placeholder="Enter title"
            />

            {!this.state.titleSelected
              && <p className="alert">Please enter the title!</p>}
          </div>

          <div className="selector">
            <select
              className="form-select form-select--bot"
              value={this.state.userId}
              onChange={this.selectUser}
            >
              <option value="">Please choose a user</option>

              {[...users].map((user) => (
                <option
                  value={user.id}
                  key={user.id}
                >
                  {user.name}
                </option>
              ))}
            </select>

            {!this.state.userSelected
              && <p className="alert">Please choose a user!</p>}

            <button type="submit" className="btn btn-outline-primary">
              Add
            </button>
          </div>

        </form>

        <div>
          <TodoList todos={preparedData} />
        </div>

      </div>
    );
  }
}

export default App;
