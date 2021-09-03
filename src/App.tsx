import React from 'react';
import './App.scss';

import users from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';

const preparedTodos: Todo[] = todosFromServer.map(todo => {
  const user = users.find(person => person.id === todo.userId) || null;

  return { user, ...todo };
});

interface State {
  todos: Todo[];
  userId: number;
  title: string;
  completed: boolean;
  isUserEmpty: boolean;
  isTitleEmpty: boolean;
}

class App extends React.Component<{}, State> {
  state = {
    todos: preparedTodos,
    userId: 0,
    title: '',
    completed: false,
    isUserEmpty: false,
    isTitleEmpty: false,
  };

  addNewTodo = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { userId, title } = this.state;

    if (!userId || !title.trim()) {
      this.setState(prevState => ({
        isUserEmpty: !prevState.userId,
        isTitleEmpty: !prevState.title.trim(),
      }));

      return;
    }

    this.setState(prevState => {
      const newTodo = {
        user: users.find(user => user.id === userId) || null,
        userId,
        id: prevState.todos.length + 1,
        title,
        completed: prevState.completed,
      };

      return ({
        todos: [...prevState.todos, newTodo],
        userId: 0,
        title: '',
      });
    });
  };

  addNewTask = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      title: event.target.value.replace(/[^ a-zA-Zа-яА-я0-9]/g, ''),
      isTitleEmpty: false,
    });
  };

  selectUser = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({
      userId: +event.target.value,
      isUserEmpty: false,
    });
  };

  render() {
    const {
      title,
      todos,
      isTitleEmpty,
      isUserEmpty,
    } = this.state;

    return (
      <div className="App">
        <div className="todos">
          <h1>Add todo form</h1>
          <form onSubmit={this.addNewTodo} className="todos__form form">

            <label htmlFor="newTask">
              Add new todo:
              <input
                className="form__input"
                type="text"
                name="newTask"
                id="newTask"
                value={title}
                onChange={this.addNewTask}
                placeholder="Enter new task here"
              />
            </label>
            {isTitleEmpty
              && <span className="form__alert">Please enter the title!</span>}

            <select onChange={this.selectUser} value={this.state.userId}>
              <option value={0}>Choose a user</option>
              {users.map(user => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
            {isUserEmpty
              && <span className="form__alert form__alert--select">Please choose a user!</span>}
            <button type="submit" className="form__button">
              Add
            </button>

          </form>
          <TodoList todos={todos} />
        </div>
      </div>
    );
  }
}

export default App;
