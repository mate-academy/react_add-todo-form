import React from 'react';
import { TodoList } from '../TodoList/TodoList';
import './App.css';

import Users from '../../api/users';
import Todos from '../../api/todos';

const greaterId = Todos.sort((todo1, todo2) => todo2.id - todo1.id)[0].id;
const preparedTodos = Todos.map(todo => ({
  ...todo,
  ownerName: Users.find(user => user.id === todo.userId).name,
}));

export class App extends React.PureComponent {
  state = {
    todos: preparedTodos,
    todoTitle: '',
    userName: '',
    userId: null,
    buttonClicked: false,
    id: greaterId,
  }

  addTodo = () => {
    this.setState(prevState => ({
      id: prevState.id + 1,
      todos: [
        ...prevState.todos,
        {
          title: prevState.todoTitle,
          userId: prevState.userId,
          id: prevState.id + 1,
          ownerName: Users.find(user => user.id === prevState.userId).name,
          completed: false,
        },
      ],
      todoTitle: '',
      buttonClicked: false,
    }));
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ buttonClicked: true });

    if (this.state.todoTitle === '' || this.state.userName === '') {
      return;
    }

    this.addTodo();
  }

  render() {
    const { todoTitle, userName, buttonClicked } = this.state;

    return (
      <div className="App">
        <h1>Todo List</h1>

        <p>
          <span>{`Users: ${Users.length}`}</span>
        </p>
        <form
          method="GET"
          onSubmit={this.handleSubmit}
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
            <option value="" disabled>Choose user</option>

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
          >
            Add
          </button>
        </form>

        <TodoList todos={this.state.todos} />
      </div>
    );
  }
}
