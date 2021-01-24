import React from 'react';
import './App.css';

import TodoList from './Components/TodoList';

import users from './api/users';
import todos from './api/todos';

function getTodosUserId(userId) {
  return users.find(user => user.id === userId).id;
}

const todosWithUserFromFile = todos.map(todo => ({
  ...todo,
  user: getTodosUserId(todo.userId),
}));

export class App extends React.Component {
  state = {
    todosWithUser: todosWithUserFromFile,
    todoName: '',
    userID: '',
    countId: todosWithUserFromFile.length,
    noTitle: false,
    noSelect: false,
    maxLength: 30,
  }

  addOneId = () => {
    this.setState(state => ({
      countId: state.countId + 1,
    }));
  };

  render() {
    const {
      todosWithUser,
      todoName,
      userID,
      countId,
      noTitle,
      noSelect,
      maxLength,
    } = this.state;

    return (
      <div className="App">
        <h1>Add todo form</h1>

        <form
          action="/api/todos"
          method="POST"
          onSubmit={(event) => {
            event.preventDefault();

            if (!todoName && !userID) {
              this.setState({
                noTitle: true,
                noSelect: true,
              });

              return;
            }

            if (todoName.replace(/[^a-zA-Z0-9]/g, '').length === 0) {
              this.setState({
                noTitle: true,
              });

              return;
            }

            if (!userID) {
              this.setState({
                noSelect: true,
              });

              return;
            }

            this.setState((prevState) => {
              const newTodo = {
                id: countId,
                userId: prevState.userID,
                title: prevState.todoName
                  .split('')
                  .slice(0, maxLength)
                  .join(''),
                completed: false,
              };

              return ({
                todosWithUser: [...prevState.todosWithUser, newTodo],
                todoName: '',
                userID: '',
              });
            });
          }}
        >
          <div className="form__filed">
            <label htmlFor="todo__name-new">
              Todo name
            </label>

            <input
              type="text"
              name="todoName"
              value={todoName}
              id="todo__name-new"
              onChange={(event) => {
                this.setState({
                  todoName: event.target.value,
                  noTitle: false,
                });
              }}
              placeholder="Todo name"
            />
            <span
              className="form__error"
            >
              {noTitle
              && 'Please add alphanumeric todo'}
            </span>
            <br />

          </div>

          <div className="form__filed">
            <label htmlFor="user__id-new">
              UserID
            </label>

            <select
              name="userID"
              id="user__id-new"
              value={userID}
              onChange={(event) => {
                this.setState({
                  userID: +event.target.value,
                  noSelect: false,
                });
              }}
            >
              <option>Choose UserID</option>
              {users.map(user => (
                <option value={user.id} key={user.id}>
                  {user.id}
                </option>
              ))}
            </select>
            <span
              className="form__error"
            >
              {noSelect
                && 'Please choose a user'}
            </span>
            <br />
          </div>

          <button
            type="submit"
            className="buttonAdd"
            onClick={this.addOneId}
          >
            Add
          </button>

        </form>

        <TodoList
          todosWithUser={todosWithUser}
        />
      </div>
    );
  }
}

export default App;
