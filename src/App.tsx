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
    userSelected: true,
    titleSelected: true,
  };

  addTodo = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    const { userId, title } = this.state;

    this.setState(prevState => {
      const createdTodo = {
        user: users.find(user => user.id === userId) || null,
        userId,
        id: Math.max(...prevState.todos.map(item => item.id)) + 1,
        title,
        completed: false,
      };

      // eslint-disable-next-line no-console
      console.log(createdTodo);

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

  checkFields = () => {
    const { userId, title } = this.state;

    if (title.length === 0) {
      this.setState({
        titleSelected: false,
      });
    }

    if (userId === 0) {
      this.setState({ userSelected: false });
    }
  };

  render() {
    return (
      <div className="App">
        <h1>Add todo form</h1>

        <form onSubmit={this.addTodo}>

          <div className="mb-3">

            <input
              type="text"
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
              <option value="">Choose a user</option>

              {users.map((user) => (
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

            <button
              type="submit"
              onClick={this.checkFields}
              className="btn btn-outline-primary"
            >
              Add
            </button>
          </div>

        </form>

        <div>
          <TodoList todos={this.state.todos} />
        </div>

      </div>
    );
  }
}

export default App;
