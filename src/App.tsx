import React from 'react';
import './App.css';
import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';

import users from './api/users';
import todos from './api/todos';

interface State {
  todosList: Todo[],
  todoTitle: string,
  todoExecutor: string,
  titleError: string,
  selectError: string,
  isValidTitle: boolean,
  isValidSelect: boolean,
}

class App extends React.Component<{}, State> {
  state = {
    todosList: [...todos],
    todoTitle: '',
    todoExecutor: '',
    titleError: '',
    selectError: '',
    isValidTitle: false,
    isValidSelect: false,
  };

  reloadHandler = (event: React.FormEvent<HTMLFormElement>) => (
    event.preventDefault()
  );

  titleHandler = (event: React.ChangeEvent<HTMLInputElement>) => (
    this.setState({
      todoTitle: event.target.value,
      titleError: '',
      isValidTitle: true,
    })
  );

  userPickHandler = (event: React.ChangeEvent<HTMLSelectElement>) => (
    this.setState({
      todoExecutor: event.target.value,
      selectError: '',
      isValidSelect: true,
    })
  );

  clearAllSelection = () => (
    this.setState({
      todoTitle: '',
      todoExecutor: '',
    })
  );

  addTodo = () => {
    const {
      todosList,
      todoExecutor,
      todoTitle,
      isValidSelect,
      isValidTitle,
    } = this.state;

    if (todoExecutor === '') {
      this.setState({
        selectError: 'Please, choose a user...',
        isValidSelect: false,
      });
    }

    if (todoTitle === '') {
      this.setState({
        titleError: 'Please, enter a todo...',
        isValidTitle: false,
      });
    }

    if (isValidSelect && isValidTitle) {
      this.setState((state) => ({
        isValidTitle: false,
        isValidSelect: false,
        todosList: [...state.todosList, {
          id: todosList[todosList.length - 1].id + 1,

          userId: users.findIndex((user) => (
            user.name === todoExecutor
          )) + 1,

          title: state.todoTitle,
          completed: false,
        }],
      }));

      this.clearAllSelection();
    }
  };

  render() {
    const {
      todosList,
      todoTitle,
      todoExecutor,
      titleError,
      selectError,
    } = this.state;

    return (
      <div className="app">
        <h1>
          {`Users: ${users.length}`}
        </h1>
        <div className="app__form">
          <form
            onSubmit={this.reloadHandler}
          >
            <input
              type="text"
              name="title"
              placeholder="Enter todo..."
              onChange={this.titleHandler}
              value={todoTitle}
            />
            <div>
              {titleError}
            </div>

            <select
              name="users"
              onChange={this.userPickHandler}
              value={todoExecutor}
            >
              <option>
                Choose a user...
              </option>
              {
                users.map((user) => (
                  <option
                    key={user.id}
                    value={user.name}
                  >
                    {user.name}
                  </option>
                ))
              }
            </select>
            <div>
              {selectError}
            </div>

            <button
              type="submit"
              onClick={this.addTodo}
            >
              Add
            </button>
          </form>

          <TodoList todos={[...todosList]} />
        </div>
      </div>
    );
  }
}

export default App;
