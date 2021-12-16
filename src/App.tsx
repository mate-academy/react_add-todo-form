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
  selectError: boolean | null,
  titleError: boolean | null,
};

class App extends React.Component<{}, State> {
  state = {
    todosList: todosFromServer,
    title: '',
    userId: 0,
    selectError: null,
    titleError: null,
  };

  titleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let isValid = event.target.value.replaceAll(/[^a-zA-z0-9а-яА-яІі ]+/g, '');

    isValid = isValid.replaceAll(/[_^]/g, '');
    this.setState({ title: isValid });
  };

  completeToggle = (todo:Todos) => {
    const todoChanged = this.state.todosList.find((item) => item.id === todo.id);
    const todoIndex = this.state.todosList.findIndex((item) => item.id === todo.id);

    if (typeof todoChanged !== 'undefined') {
      todoChanged.completed = !todoChanged.completed;

      this.setState((state) => {
        state.todosList.splice(todoIndex, 1, todoChanged);

        return {
          todosList: state.todosList,
        };
      });
    }
  };

  addTodo = () => {
    const newTodo = {
      userId: this.state.userId,
      id: this.state.todosList.length + 1,
      title: this.state.title,
      completed: false,
    };

    if (this.state.title.length === 0) {
      this.setState({ titleError: true });

      return;
    }

    if (this.state.userId === 0) {
      this.setState({ selectError: true });

      return;
    }

    this.setState(state => ({
      todosList: [...state.todosList, newTodo],
      title: '',
      userId: 0,
      selectError: null,
      titleError: null,
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
        <h1 className="App__caption">Add todo form</h1>

        <form
          className="todo__form"
          action=""
          method="get"
          onSubmit={(event) => {
            event.preventDefault();
          }}
        >
          {
            this.state.titleError
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
                this.titleChange(event);
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
                this.setState({ userId: Number(event.target.value), selectError: null });
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
            this.state.selectError
            && <p>Please choose a User</p>
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
                  <button
                    type="button"
                    className="todo__button"
                    onClick={() => {
                      this.completeToggle(todo);
                    }}
                  >
                    <div className="todo__info">
                      <div>{todo.user?.name}</div>
                      <div>{todo.user?.email}</div>
                    </div>
                    <div>{todo.title}</div>
                    <div>
                      {
                        todo.completed
                          ? <img className="todo__image" src="./images/tick.png" alt="completed" />
                          : <img className="todo__image" src="./images/cross.png" alt="in progress" />
                      }
                    </div>
                  </button>
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
