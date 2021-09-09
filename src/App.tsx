import React from 'react';
import './App.scss';

import users from './api/users';
import todos from './api/todos';
import { TodoList } from './components/TodoList/TodoList';

const addedTodos = [...todos];

type State = {
  title: string;
  userId: number | '';
  id: number;
  errors: {
    name: string;
    user: string;
  }
  preparedTodos: PreparedTodo[] | [];
};

class App extends React.Component<{}, State> {
  state: State = {
    title: '',
    userId: '',
    id: addedTodos.length + 1,
    errors: {
      name: '',
      user: '',
    },
    preparedTodos: [],
  };

  componentDidMount() {
    this.prepareTodos();
  }

  prepareTodos = () => {
    this.setState({
      preparedTodos: addedTodos.map(todo => {
        return {
          ...todo,
          user: users.find(user => todo.userId === user.id) || null,
        };
      }),
    });
  };

  addTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ title: event.target.value });
  };

  validation = () => {
    if (!this.state.title) {
      this.setState({ errors: { name: 'Please enter the title', user: '' } });

      return;
    }

    if (!this.state.userId) {
      this.setState({ errors: { name: '', user: 'Please choose a user' } });
    }
  };

  clearState = () => {
    this.setState(currentState => {
      return {
        title: '',
        userId: '',
        id: currentState.id + 1,
        errors: {
          name: '',
          user: '',
        },
      };
    });
  };

  saveTodo = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { title, id, userId } = this.state;
    const newTodo = {
      title,
      id,
      userId,
      completed: false,
    };

    if (newTodo.title && newTodo.userId) {
      addedTodos.push(newTodo as Todo);
      this.clearState();
      this.prepareTodos();
    }
  };

  render() {
    const { preparedTodos } = this.state;

    return (
      <div className="App">
        <div className="add">
          <h1>Add todo</h1>

          <form onSubmit={this.saveTodo}>

            <input
              type="text"
              name="title"
              placeholder="Title"
              value={this.state.title}
              pattern="[A-Za-zа-яА-ЯЁё0-9 ]+"
              onChange={this.addTitle}
              className="form-control"
            />
            <br />
            {this.state.errors.name && <p className="error">{this.state.errors.name}</p>}
            <br />

            <select
              className="form-select"
              name="user"
              value={this.state.userId}
              onChange={(event) => {
                this.setState({ userId: +event.target.value });
              }}
            >
              <option
                value=""
                disabled
              >
                Choose a user
              </option>
              {
                users.map(user => (
                  <option
                    value={user.id}
                    key={user.id}
                  >
                    {user.name}
                  </option>
                ))
              }

            </select>
            <br />

            {this.state.errors.user && <p className="error">{this.state.errors.user}</p>}

            <button
              type="submit"
              onClick={this.validation}
              className="btn btn-primary"
            >
              Add
            </button>
          </form>
        </div>

        <TodoList todoList={preparedTodos} />
      </div>
    );
  }
}

export default App;
