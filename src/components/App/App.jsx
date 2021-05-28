import React from 'react';
import { TodoList } from '../TodoList/TodoList';
import './App.css';

import Users from '../../api/users';
import Todos from '../../api/todos';

const greaterId = Todos.sort((todo1, todo2) => todo2.id - todo1.id)[0].id;

export class App extends React.PureComponent {
  state = {
    todos: Todos,
    todoTitle: '',
    userName: '',
    userId: null,
    buttonClicked: false,
    id: greaterId,
  }

  sendData = () => {
    this.setState(prevState => ({
      id: prevState.id + 1,
      todos: [
        ...prevState.todos,
        {
          title: prevState.todoTitle,
          userId: prevState.userId,
          id: prevState.id + 1,
        },
      ],
      todoTitle: '',
      buttonClicked: false,
    }));
  }

  render() {
    const { todos, todoTitle, userName, userId, buttonClicked } = this.state;

    return (
      <div className="App">
        <h1>Todo List</h1>

        <p>
          <span>{`Users: ${Users.length}`}</span>
        </p>

        <form
          method="GET"
          onSubmit={(event) => {
            event.preventDefault();
          }}
        >
          <select
            name="users"
            value={userName}
            onChange={(event) => {
              const { value } = event.target;

              this.setState({
                userName: value,
                userId: value === ''
                  ? ''
                  : Users.find(user => user.name === value).id,
              });
            }}
          >
            <option value="">Choose user</option>

            {Users.map(user => (
              <option key={user.id} value={user.name}>
                {user.name}
              </option>
            ))}
          </select>

          {buttonClicked && userName === '' && (
          <span className="error select-message">
            Please choose a user
          </span>
          )}

          <br />
          <br />

          <input
            type="text"
            name="newTodo"
            placeholder="Enter todo"
            value={todoTitle}
            onChange={
              (event) => {
                this.setState({ todoTitle: event.target.value });
              }
            }
          />

          {buttonClicked && todoTitle === '' && (
          <span className="error todo-message">
            Please enter the title
          </span>
          )}

          <br />
          <br />

          <button
            type="submit"
            onClick={() => {
              this.setState({ buttonClicked: true });

              if (todoTitle === '' || userName === '') {
                return;
              }

              this.sendData();
            }}
          >
            Add
          </button>
        </form>

        <ul>
          {todos
            .filter(todo => todo.userId === userId)
            .map(todo => (
              <li key={todo.id}>
                <TodoList {...todo} />
              </li>
            ))}
        </ul>
      </div>
    );
  }
}
