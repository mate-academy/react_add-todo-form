import React from 'react';
import './App.scss';
import todos from './api/todos';
import users from './api/users';

interface User {
  id: number;
  name: string;
  email: string;
}

interface Todo {
  id: number;
  title: string;
  userId: number | null;
  completed: boolean;
  user?: User | null;
}

type State = {
  todoList: Todo[];
  title: string;
  userId: number;
  hasTitleError: boolean;
  hasIdError: boolean;
};

const todosForApp: Todo[] = todos.map((todo) => ({
  ...todo,
  title: todo.title,
  user: users.find((user) => user.id === todo.userId),
}));

class App extends React.Component<{}, State> {
  state: State = {
    todoList: todosForApp,
    title: '',
    userId: 0,
    hasTitleError: false,
    hasIdError: false,
  };

  formSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    this.setState((prevState) => {
      if (!prevState.title || !prevState.userId) {
        return {
          ...prevState,
          hasTitleError: !prevState.title,
          hasIdError: !prevState.userId,
        };
      }

      const maxId = Math.max(...prevState.todoList.map((todo) => todo.id));
      const newTask: Todo = {
        id: maxId + 1,
        title: prevState.title,
        userId: prevState.userId,
        completed: false,
        user: users.find((user) => user.id === prevState.userId),
      };

      return {
        title: '',
        userId: 0,
        hasTitleError: false,
        hasIdError: false,
        todoList: [newTask, ...prevState.todoList],
      };
    });
  };

  changeHandler = (
    event: React.FormEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, id, value } = event.currentTarget;
    const v = value;

    this.setState(state => ({
      ...state,
      [name]: id === 'select' ? +v : v,
    }));
  };

  render() {
    const {
      todoList,
      userId,
      title,
      hasTitleError,
      hasIdError,
    } = this.state;

    return (
      <div className="app">
        <h1>Add todo form</h1>
        <form onSubmit={this.formSubmitHandler}>
          <div className="app__form-element">
            <label htmlFor="title" className="app__label">
              Input title of new task
              <input
                type="text"
                name="title"
                id="title"
                value={title}
                placeholder="Input title"
                onChange={this.changeHandler}
                className={
                  !hasTitleError
                    ? 'app__field'
                    : 'app__field--error'
                }
              />
            </label>
            {hasTitleError && title.length === 0 && (
              <span className="error">Please enter a title</span>
            )}
          </div>

          <div className="app__form-element">
            <label htmlFor="id" className="app__label">
              Set an executor
              <select
                name="userId"
                id="select"
                value={userId}
                onChange={this.changeHandler}
                className={!hasIdError ? 'app__field' : 'app__field--error'}
              >
                <option key={0} value={0}>
                  Choose an executor
                </option>
                {users.map((user) => (
                  <option value={user.id} key={user.id}>
                    {user.name}
                  </option>
                ))}
              </select>
            </label>
            {hasIdError && (
              <span className="error">Please choose an executor</span>
            )}
          </div>
          <button type="submit" className="app__btn">
            Add new task
          </button>
        </form>

        <table className="app__table">
          <thead>
            <tr>
              <td>Title</td>
              <td>Completed</td>
              <td>Name</td>
              <td>email</td>
            </tr>
          </thead>
          <tbody>
            {todoList.map((todo) => (
              <tr>
                <td>{todo.title}</td>
                <td>{todo.completed ? 'Completed' : 'In progress'}</td>
                <td>{todo.user?.name}</td>
                <td>{todo.user?.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default App;
