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
    todoFromServer,
    userForSelect: [...users],
    selectValue: 0,
    titleValue: '',
    isTitle: false,
    isUser: false,
  }

  titleHandler = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
      isTitle: false,
    });
  }

  selectHandler = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: +value,
      isUser: false,
    });
  }

  addToList = (event) => {
    const { titleValue, selectValue } = this.state;

    event.preventDefault();

    if (!titleValue && selectValue === 0) {
      this.setState({
        isTitle: true,
        isUser: true,
      });

      return;
    }

    if (!titleValue) {
      this.setState({
        isTitle: true,
      });

      return;
    }

    if (selectValue === 0) {
      this.setState({
        isUser: true,
      });

      return;
    }

    this.setState((state) => {
      const newTodo = {
        id: state.todoFromServer.length + 1,
        title: titleValue,
        completed: false,
        userId: selectValue,
        user: getId(selectValue),
      };

      this.setState({
        selectValue: 0,
        titleValue: '',
      });

      return ({
        todoFromServer: [...state.todoFromServer, newTodo],
      });
    });
  };

  render() {
    const {
      isTitle,
      isUser,
      userForSelect,
      selectValue,
      titleValue,
    } = this.state;

    return (
      <div className="App">
        <h1>Add todo form</h1>
        <form method="GET">
          <label>
            <input
              type="text"
              name="titleValue"
              placeholder="Please enter the title"
              value={titleValue}
              onChange={this.titleHandler}
            />
          </label>
          <label>
            <select
              name="selectValue"
              onChange={this.selectHandler}
              value={selectValue}
            >
              <option>Choose a user</option>
              {userForSelect.map(user => (
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
        <TodoList todos={this.state.todoFromServer} />
        {isTitle && (
          <div className="isTitle">Dude, write some title</div>
        )}
        {isUser && (
          <div className="isUser">Mate, u didnt choose user</div>
        )}
      </div>
    );
  }
}

export default App;
