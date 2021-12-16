import React from 'react';
import './App.scss';

import users from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList/TodoList';
import { Todo } from './types/todo';
import { User } from './types/user';

const preparedTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: users.find(user => user.id === todo.userId) || null,
}));

type State = {
  todos: Todo[];
  userName: string;
  title: string,
  inputError: boolean,
  selectError: boolean,
};

export class App extends React.Component<{}, State> {
  state: State = {
    todos: [...preparedTodos],
    userName: '',
    title: '',
    inputError: false,
    selectError: false,
  };

  addTodo = () => {
    const currentUser: User | null = users.find(
      user => (user.name === this.state.userName),
    ) || null;

    if (currentUser === null) {
      return;
    }

    const createdTodo: Todo = {
      userId: currentUser.id,
      title: this.state.title,
      id: this.state.todos.length + 1,
      user: currentUser,
      completed: false,
    };

    this.setState((state) => ({
      todos: [...state.todos, createdTodo],
    }));
  };

  clearForm = () => {
    this.setState({
      title: '',
      userName: '',
    });
  };

  setUser = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    this.setState({
      userName: value,
      selectError: false,
    });
  };

  validateSubmit = () => {
    const { title, userName } = this.state;

    this.setState({
      inputError: title === '',
      selectError: userName === '',
    });

    return title && userName;
  };

  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!this.validateSubmit()) {
      return;
    }

    this.addTodo();
    this.clearForm();
  };

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      title: event.target.value,
      inputError: false,
    });
  };

  handleChecked = (id:number) => {
    const addedTodo = this.state.todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed };
      }

      return todo;
    });

    this.setState(() => ({
      todos: addedTodo,
    }));
  };

  render() {
    const {
      todos, selectError, inputError, userName, title,
    } = this.state;

    return (
      <div className="App">
        <div className="App__container">
          <form
            className="todo__form"
            action="get"
            onSubmit={this.handleSubmit}
          >
            <div className="todo__content">
              Что прикажете?
              <div className="todo__inputBlock">
                <input
                  type="text"
                  className="todo__inputTitle"
                  value={title}
                  onChange={this.handleChange}
                />
                {inputError && (
                  <div className="error">
                    Нужно какое-то поручение
                  </div>
                )}
              </div>
              <div className="todo__selectBlock">
                <label htmlFor="userSelect">
                  <select
                    className="todo__select"
                    name="user"
                    id="userSelect"
                    value={userName}
                    onChange={this.setUser}
                  >
                    <option value="">Выберите исполнителя</option>
                    {users.map((user) => (
                      <option key={user.id} value={user.name}>{user.name}</option>
                    ))}
                  </select>
                </label>
                {selectError && (
                  <div className="error">
                    Кому поручить?
                  </div>
                )}
              </div>
            </div>
            <button
              className="todo__button"
              type="submit"
            >
              Отправить на задание
            </button>
          </form>
        </div>
        <TodoList
          preparedTodos={todos}
          handleChecked={this.handleChecked}
        />
      </div>
    );
  }
}

export default App;
