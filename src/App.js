import React from 'react';
import './App.css';
// import { TodoForm } from './components/TodoForm';
import { TodoList } from './components/TodoList';
import usersFromApi from './api/users';
import todosFromApi from './api/todos';

const preparedTodos = todosFromApi.map(todo => ({
  ...todo,
  user: usersFromApi.find(user => user.id === todo.userId),
}));

class App extends React.Component {
  state = {
    todos: preparedTodos,
    title: '',
    user: '',
    isErrorBlock: {
      title: false,
      user: false,
    },
  }

  changeValue = (event) => {
    const { value, name } = event.target;

    this.setState(prevState => ({
      [name]: value,
      isErrorBlock: {
        ...prevState.isErrorBlock,
        [name]: false,
      },
    }));
  }

  submitTodo = (event) => {
    event.preventDefault();
    const { title, user } = this.state;

    if (title && user) {
      this.setState((prevState) => {
        const newTodo = {
          title: prevState.title,
          userId: +prevState.user,
          user: usersFromApi.find(person => person.id === +prevState.user),
          id: this.state.todos.length + 1,
          completed: ((Math.random() * 10) >= 5),
        };

        return ({
          todos: [...prevState.todos, newTodo],
          user: '',
          title: '',
        });
      });
    }

    if (!title) {
      this.setState(prevState => ({
        isErrorBlock: {
          ...prevState.isErrorBlock,
          title: true,
        },
      }));
    }

    if (!user) {
      this.setState(prevState => ({
        isErrorBlock: {
          ...prevState.isErrorBlock,
          user: true,
        },
      }));
    }
  }

  render() {
    const { todos } = this.state;
    const { title, user, isErrorBlock } = this.state;

    return (
      <div className="todo">
        <h1>Add todo form</h1>

        <form
          action="#"
          method="POST"
          className="form"
          onSubmit={this.submitTodo}
        >

          <div className="form__field">

            {isErrorBlock.title && (
              <p className="error-text">
                Please choose a user
              </p>
            )}

            <label htmlFor="new-title">
              Enter title
              <input
                type="text"
                name="title"
                value={title}
                onChange={this.changeValue}
                id="new-title"
                className="todo__input"
                placeholder="Enter title"
              />
            </label>
          </div>

          <div className="form__field">

            {isErrorBlock.user && (
              <p className="error-text">
                Please choose a user
              </p>
            )}

            <label htmlFor="new-user">
              Select user
              <select
                name="user"
                id="new-user"
                className="todo__select"
                value={user}
                onChange={this.changeValue}
              >
                <option>Please choose a user</option>
                {usersFromApi.map(person => (
                  <option
                    value={person.id}
                    key={person.id}
                  >
                    {person.name}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <button
            type="submit"
          >
            Add
          </button>
        </form>

        <TodoList todos={todos} />
      </div>
    );
  }
}

export default App;
