import React from 'react';
import './App.css';
import './Todo.css';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

type State = {
  todosList: Todo[]
  title: string,
  userId: number,
  selectError: string | null,
  titleError: string | null,
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
    const isValid = event.target.value.replaceAll(/[^0-9a-zA-Z а-яА-ЯІі]/g, '');

    this.setState({ title: isValid, titleError: null });
  };

  completeToggle = (todoId:number) => {
    this.setState(state => ({
      todosList: state.todosList.map(todo => {
        if (todoId !== todo.id) {
          return todo;
        }

        return { ...todo, completed: !todo.completed };
      }),
    }));
  };

  addTodo = () => {
    const newTodo = {
      userId: this.state.userId,
      id: this.state.todosList.length + 1,
      title: this.state.title,
      completed: false,
    };

    if (this.state.title.length === 0) {
      this.setState({ titleError: 'Please enter Your text' });

      return;
    }

    if (this.state.userId === 0) {
      this.setState({ selectError: 'Please choose a User' });

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
          { this.state.titleError
            && (
              <p className="todo__error">
                {this.state.titleError}
              </p>
            )}

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

          { this.state.selectError
            && (
              <p className="todo__error">
                {this.state.selectError}
              </p>
            )}

          <button
            className="button"
            type="submit"
            onClick={this.addTodo}
          >
            Add TODO
          </button>
        </form>

        <TodoList
          todoList={todosList}
          completeToggle={this.completeToggle}
        />
      </div>
    );
  }
}

export default App;
