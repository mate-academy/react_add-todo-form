import React from 'react';
import ClassNames from 'classnames';
import './App.css';

import users from './api/users';
import todos from './api/todos';

import { TodoList } from './conponets/todoList/Todolist';
import { PrepearedTodoTypes } from './types/PrepearedTodoTypes';

type State = {
  todos: PrepearedTodoTypes[],
  selectedUser: number,
  isUserSelected: boolean,
  inputTitle: string,
  isTitleSelected: boolean,
};

const preparedTodos: PrepearedTodoTypes[] = todos.map(item => {
  const currentUser = users.find(user => item.userId === user.id) || null;

  return {
    ...item,
    user: currentUser,
  };
});

class App extends React.Component<{}, State> {
  state = {
    todos: preparedTodos,
    selectedUser: 0,
    isUserSelected: true,
    inputTitle: '',
    isTitleSelected: true,
  };

  handleTitleChange:React.ChangeEventHandler<HTMLInputElement> = (event) => {
    this.setState({
      inputTitle: event.target.value,
      isTitleSelected: true,
    });
  };

  handleUserChange: React.ChangeEventHandler<HTMLSelectElement> = (event) => {
    this.setState({
      selectedUser: +event.target.value,
      isUserSelected: !!+event.target.value,
    });
  };

  submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    this.setState((prevState) => {
      if (!prevState.selectedUser || !prevState.inputTitle) {
        return ({
          ...prevState,
          isTitleSelected: !!prevState.inputTitle,
          isUserSelected: !!prevState.selectedUser,
        });
      }

      const currentUser = users.find(user => user.id === prevState.selectedUser) || null;
      const maxTodoID = Math.max(...prevState.todos.map(todo => todo.id));

      const newTodo = {
        userId: prevState.selectedUser,
        id: maxTodoID + 1,
        title: prevState.inputTitle,
        completed: false,
        user: currentUser,
      };

      return ({
        todos: [...prevState.todos, newTodo],
        selectedUser: 0,
        isUserSelected: true,
        inputTitle: '',
        isTitleSelected: true,
      });
    });
  };

  render() {
    const {
      inputTitle,
      isTitleSelected,
      selectedUser,
      isUserSelected,
    } = this.state;

    return (
      <div className="todo">
        <form
          onSubmit={this.submit}
          className="todo__form"
        >
          <div
            className="todo__fields"
          >
            <input
              className={ClassNames('text-field', {
                'field-error': !isTitleSelected,
              })}
              type="text"
              placeholder="Enter Title"
              value={inputTitle}
              onChange={this.handleTitleChange}
            />
            {!isTitleSelected && (
              <span className="error">
                Please, add title
              </span>
            )}
          </div>
          <div
            className="todo__fields"
          >
            <select
              value={selectedUser}
              onChange={this.handleUserChange}
              className={ClassNames('select-field', {
                'field-error': !isUserSelected,
              })}
            >
              <option value="0">▼ Users ▼</option>
              {users.map(user => (
                <option
                  value={user.id}
                  key={user.id}
                >
                  {user.name}
                </option>
              ))}
            </select>
            {!isUserSelected && (
              <span className="error">
                Please, select a User
              </span>
            )}
          </div>
          <button
            type="submit"
            className="btn"
          >
            Add
          </button>
        </form>
        <TodoList todoLists={this.state.todos} />
      </div>
    );
  }
}

export default App;
