import React from 'react';
import './App.css';
import { TodoList } from './components/TodoList/TodoList';
import unpreparedTodos from './api/todos';
import users from './api/users';

const preparedTodos: Todo[] = unpreparedTodos.map(todo => ({
  ...todo,
  user: users.find(user => user.id === todo.userId) || null,
}));

type State = {
  todoTitle: string,
  todoUser: number,
  todos: Todo[],
  hasTitleError: boolean,
  hasUserError: boolean,
};

class App extends React.Component<{}, State> {
  state = {
    todoTitle: '',
    todoUser: 0,
    todos: [...preparedTodos],
    hasTitleError: false,
    hasUserError: false,
  };

  addTodo = () => {
    if (this.state.todoTitle && this.state.todoUser) {
      this.setState((state) => ({
        todos: [...state.todos,
          {
            title: state.todoTitle,
            id: state.todos.length + 1, // how to change to Math.max() ?
            completed: false,
            user: users.find(user => user.id === state.todoUser) || null,
          },
        ],
      }));
    }
  };

  inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      todoTitle: event.target.value,
      hasTitleError: false,
    });
  };

  selectHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({
      todoUser: Number(event.target.value),
      hasUserError: false,
    });
  };

  validateForm = () => {
    const { todoTitle, todoUser } = this.state;

    if (!todoTitle || !todoUser) {
      this.setState({
        hasTitleError: !todoTitle,
        hasUserError: !todoUser,
      });
    }
  };

  clearForm = () => {
    this.setState((state) => ({
      ...state,
      todoTitle: '',
      todoUser: 0,
    }));
  };

  render() {
    const {
      todoTitle,
      todoUser,
      todos,
      hasTitleError,
      hasUserError,
    } = this.state;

    return (
      <div className="App">
        <section className="form">
          <form
            action=""
            onSubmit={(event) => {
              event.preventDefault();
              this.validateForm();
              this.addTodo();
              this.clearForm();
            }}
          >
            <input
              className="input form__input"
              type="text"
              placeholder="What's your task?"
              value={todoTitle}
              onChange={this.inputHandler}
            />

            {hasTitleError && <span className="form__error">Please enter a title</span>}

            <label className="label form__label" htmlFor="userSelect">
              Select user:
              <select
                className="select form__select"
                id="userSelect"
                name="user"
                value={todoUser}
                onChange={this.selectHandler}
              >
                <option disabled value="0">Choose a user</option>
                {users.map(user => (
                  <option key={user.id} value={user.id}>{user.name}</option>
                ))}
              </select>
            </label>

            {hasUserError && <span className="form__error">Please choose a user</span>}

            <button className="button form__button" type="submit">Add</button>
          </form>
        </section>

        <TodoList todos={todos} />
      </div>
    );
  }
}

export default App;
