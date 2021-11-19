import React from 'react';
import './App.css';

import classNames from 'classnames';
import users from './api/users';
import todos from './api/todos';
import { TodoList } from './components/TodoList/TodoList';

const allTodos = [...todos];

class App extends React.Component {
  state = {
    newTodoTitle: '',
    todoThisUser: '',
    todoErrorVisible: false,
    userErrorVisible: false,
  };

  handleChange = (event: { target: { name: string; value: string; }; }) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
  };

  render() {
    const {
      newTodoTitle, todoThisUser, todoErrorVisible, userErrorVisible,
    } = this.state;

    return (
      <div className="App">
        <h1>Add todo form</h1>
        <form
          className="todo-form"
          onSubmit={(event) => {
            event.preventDefault();
          }}
        >
          <input
            name="newTodoTitle"
            type="text"
            className="todo-form__input"
            value={newTodoTitle}
            placeholder="Title of todo"
            onChange={(e) => {
              this.handleChange(e);
              this.setState({
                todoErrorVisible: false,
              });
            }}
          />
          <select
            name="todoThisUser"
            value={todoThisUser}
            className="todo-form__select"
            onChange={(e) => {
              this.handleChange(e);
              this.setState({
                userErrorVisible: false,
              });
            }}
          >
            <option
              value=""
              key="emptySelect"
            >
              Choose a user
            </option>
            {users.map(item => {
              return (
                <option
                  value={item.name}
                  key={item.id}
                >
                  {item.name}
                </option>
              );
            })}
          </select>
          <button
            type="submit"
            className="todo-form__button"
            onClick={() => {
              const thisUser = users.find(item => item.name === todoThisUser);
              const checkTodoError = (!this.state.newTodoTitle || this.state.newTodoTitle.length > 100 || !this.state.newTodoTitle.match(/^[а-яА-ЯёЁa-zA-Z\s]+$/));

              if (!this.state.todoThisUser) {
                this.setState({
                  userErrorVisible: true,
                });
              }

              if (checkTodoError) {
                this.setState({
                  todoErrorVisible: true,
                });
              }

              if (!checkTodoError && todoThisUser) {
                allTodos.push({
                  userId: thisUser ? thisUser.id : Math.random(),
                  id: (allTodos.length + 1),
                  title: newTodoTitle,
                  completed: false,
                });

                this.setState({
                  newTodoTitle: '',
                  todoThisUser: '',
                });
              }
            }}
          >
            Add
          </button>
          <div
            className={classNames(
              'todo-form__error',
              'todo-error',
              { 'error-active': todoErrorVisible },
            )}
          >
            Please enter the title
            <br />
            (No longer 100 symbols, only ru and en letters)
          </div>
          <div
            className={classNames(
              'todo-form__error',
              'user-error',
              { 'error-active': userErrorVisible },
            )}
          >
            Please choose a user
          </div>
        </form>
        <TodoList todos={allTodos} />
      </div>
    );
  }
}

export default App;
