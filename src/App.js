import React from 'react';
import { TodoList } from './component/TodoList';
import './App.css';

import users from './api/users';
import todos from './api/todos';

const todoFromServer = todos.map(todo => ({
  ...todo,
  user: users.find(user => user.id === todo.userId),
}));

function getId(item) {
  return users.find(user => user.id === item);
}

export class App extends React.Component {
  state = {
    todos: todoFromServer,
    selectedUserId: 0,
    title: '',
    isTitleTrue: false,
    isUserTrue: false,
  }

  titleHandler = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
      isTitleTrue: false,
    });
  }

  selectHandler = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: +value,
      isUserTrue: false,
    });
  }

  addToList = (event) => {
    const { title, selectedUserId, isTitleTrue, isUserTrue } = this.state;

    event.preventDefault();

    if (!title || selectedUserId === 0) {
      this.setState({
        isTitleTrue: !isTitleTrue,
        isUserTrue: isUserTrue !== 0,
      });

      return;
    }

    this.setState((state) => {
      const newTodo = {
        id: state.todos.length + 1,
        title,
        completed: false,
        userId: selectedUserId,
        user: getId(selectedUserId),
      };

      return ({
        selectedUserId: 0,
        title: '',
        todos: [...state.todos, newTodo],
      });
    });
  };

  render() {
    const {
      isTitleTrue,
      isUserTrue,
      selectedUserId,
      title,
    } = this.state;

    return (
      <div className="App">
        <h1>Add todo form</h1>
        <form method="GET">
          <label>
            <input
              type="text"
              name="title"
              placeholder="Please enter the title"
              value={title}
              onChange={this.titleHandler}
            />
          </label>
          <label>
            <select
              name="selectedUserId"
              onChange={this.selectHandler}
              value={selectedUserId}
            >
              <option>Choose a user</option>
              {users.map(user => (
                <option
                  key={user.id}
                  value={user.id}
                >
                  {user.name}
                </option>
              ))}
            </select>
          </label>
          <button
            type="submit"
            onClick={this.addToList}
          >
            Add
          </button>
        </form>
        <TodoList todos={this.state.todos} />
        {isTitleTrue && (
          <div className="isTitleTrue">Dude, write some title</div>
        )}
        {isUserTrue && (
          <div className="isUserTrue">Mate, u didnt choose user</div>
        )}
      </div>
    );
  }
}

export default App;
