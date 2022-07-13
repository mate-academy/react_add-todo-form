import React from 'react';
import './App.scss';
import users from './api/users';
import todos from './api/todos';
import { TodoList } from './components/TodoList/TodoList';
import { User } from './types/User';
import { Todo } from './types/Todo';

const preparedTodos = todos.map(todo => ({
  ...todo,
  user: users.find(user => todo.userId === user.id) || null,
}));

type Props = {};

type State = {
  todos: Todo[];
  userId: number;
  id: number;
  title: string;
  completed: boolean;
  user: User | null
  selectUser: string;
  checkTitle: boolean;
  checkUser: boolean;
};

class App extends React.Component<Props, State> {
  state = {
    todos: preparedTodos,
    userId: 0,
    id: 0,
    title: '',
    completed: false,
    user: null,
    selectUser: '',
    checkTitle: true,
    checkUser: true,
  };

  setTitleAndId = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      title: event.currentTarget.value.replace(/[^a-zA-Z0-9а-яА-Я ]/g, ''),
      checkTitle: true,
    });

    this.setState((state) => ({
      id: state.todos.length + 1,
    }));
  };

  setUser = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const user = users.find(person => person.name
      === event.currentTarget.value);

    if (user !== undefined) {
      this.setState({
        userId: user.id,
        selectUser: user.name,
        checkUser: true,
        user: {
          name: user.name,
          email: user.email,
        },
      });
    }
  };

  checkForm = () => {
    if (this.state.title === '') {
      this.setState({ checkTitle: false });
    }

    if (this.state.selectUser === '') {
      this.setState({ checkUser: false });
    }

    if (this.state.title === '' || this.state.selectUser === '') {
      return;
    }

    this.addTodo();
  };

  reset = () => {
    this.setState({
      title: '',
      selectUser: '',
    });
  };

  addTodo = () => {
    this.setState((state) => ({
      todos: [
        ...state.todos,
        {
          userId: state.userId,
          id: state.id,
          completed: state.completed,
          title: state.title,
          user: state.user,
        },
      ],
    }));

    this.reset();
  };

  render() {
    return (
      <div className="App">
        <h1>Add todo form</h1>

        <form>
          <input
            type="text"
            data-cy="titleInput"
            name="title"
            placeholder="Enter the title"
            onChange={this.setTitleAndId}
            value={this.state.title}
          />

          <p className={
            `${this.state.checkTitle ? 'hide' : 'error'}`
          }
          >
            Please enter the title
          </p>

          <select
            name="selectUser"
            data-cy="userSelect"
            value={this.state.selectUser}
            onChange={this.setUser}
          >
            <option
              value=""
              hidden
            >
              Choose a user
            </option>
            {users.map(user => (
              <option
                key={user.id}
                value={user.name}
              >
                {user.name}
              </option>
            ))}
          </select>

          <p className={
            `${this.state.checkUser ? 'hide' : 'error'}`
          }
          >
            Please choose a user
          </p>

          <button
            type="button"
            onClick={this.checkForm}
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
