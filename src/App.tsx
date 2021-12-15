import React from 'react';
import './App.css';
import './Todo.css';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

interface Todos {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

type State = {
  todosList: Todos[]
  title: string,
  userId: number,
  isFormEmpty: boolean,
  isTitleEmpty: boolean,
};

class App extends React.Component<{}, State> {
  state = {
    todosList: todosFromServer,
    title: '',
    userId: 0,
    isFormEmpty: false,
    isTitleEmpty: false,
  };

  addTodo = () => {
    const newTodo = {
      userId: this.state.userId,
      id: this.state.todosList.length + 1,
      title: this.state.title,
      completed: false,
    };

    if (this.state.title.length === 0) {
      this.setState({ isTitleEmpty: true });

      return;
    }

    if (this.state.userId === 0) {
      this.setState({ isFormEmpty: true });

      return;
    }

    this.setState(state => ({
      todosList: [...state.todosList, newTodo],
      title: '',
      userId: 0,
      isFormEmpty: false,
      isTitleEmpty: false,
    }));
  };

  render() {
    const { todosList } = this.state;
    const todoWithUsers = todosList.map((todo) => {
      return {
        ...todo,
        user: usersFromServer.find(user => user.id === todo.userId) || null,
      };
    });

    return (
      <div className="App">
        <h1 className="todo__title">Add todo form</h1>

        <form
          className="todo__form"
          action=""
          method="get"
          onSubmit={(event) => {
            event.preventDefault();
          }}
        >
          {
            this.state.isTitleEmpty
              && this.state.title.length === 0
              && <div>Please enter Your text</div>
          }

          <label htmlFor="title">
            <input
              className="todo__input"
              type="text"
              name="title"
              placeholder="Enter your text"
              value={this.state.title}
              onChange={(event) => {
                this.setState({ title: event.target.value });
              }}
            />
          </label>

          <label htmlFor="userId">
            <select
              className="todo__select"
              name="userId"
              id="userId"
              value={this.state.userId}
              onChange={(event) => {
                this.setState({ userId: Number(event.target.value) });
              }}
            >
              <option value="0" disabled>Choose User</option>
              {usersFromServer.map(user => (
                <option value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </label>
          {
            this.state.isFormEmpty
              && this.state.userId === 0
              && <div>Please choose a User</div>
          }

          <button
            className="button"
            type="submit"
            onClick={this.addTodo}
          >
            Add TODO
          </button>
        </form>

        <ul className="todo__list">
          {
            todoWithUsers.map((todo) => {
              return (
                <li
                  key={todo.id}
                  className="todo__item"
                >
                  <div className="todo__info">
                    <div>{todo.user?.name}</div>
                    <div>{todo.user?.email}</div>
                  </div>
                  <div>{todo.title}</div>
                  <div>
                    {
                      todo.completed ? 'complete' : 'in progress'
                    }
                  </div>
                </li>
              );
            })
          }
        </ul>
      </div>
    );
  }
}

export default App;
