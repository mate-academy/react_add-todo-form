import React from 'react';
import './App.css';

import users from './api/users';
import todos from './api/todos';
import { TodoList } from './TodoList';

class App extends React.Component<{}, {}> {
  state = {
    todosSecond: todos,
    newTodo: '',
    userForNewTodo: '0',
    isChoosedUser: true,
    isWritedTitle: true,
  };

  changeuserForNewTodo = (value: string) => {
    this.setState({
      userForNewTodo: value,
      isChoosedUser: true,
    });
  };

  addTodo = () => {
    const {
      todosSecond, newTodo, userForNewTodo,
    } = this.state;

    if (newTodo.length === 0 && userForNewTodo === '0') {
      this.setState({
        isChoosedUser: false,
        isWritedTitle: false,
      });
    }

    if (newTodo.length !== 0 && userForNewTodo === '0') {
      this.setState({
        isChoosedUser: false,

      });
    }

    if (newTodo.length === 0 && userForNewTodo !== '0') {
      this.setState({

        isWritedTitle: false,
      });
    }

    if (newTodo.length !== 0 && userForNewTodo !== '0') {
      this.setState(() => {
        todosSecond.push({
          userId: +userForNewTodo,
          id: todosSecond.length + 1,
          title: newTodo,
          completed: true,
        });
      });
      this.setState({
        newTodo: '',
        userForNewTodo: '0',
        isChoosedUser: true,
        isWritedTitle: true,
      });
    }
  };

  render() {
    const todoToRender = this.state.todosSecond.map(todo => {
      const userTodo = users.find(user => user.id === todo.userId) || null;

      return {
        ...todo,
        user: userTodo,
      };
    });

    todoToRender.reverse();

    return (
      <div className="App">
        <h1>Add todo form</h1>
        <div className="input">
          <div>
            <label htmlFor="addTodo">
              <input
                type="text"
                id="addTodo"
                placeholder="Write title here"
                required
                value={this.state.newTodo}
                onChange={(event) => {
                  this.setState({
                    newTodo: event.target.value,
                    isWritedTitle: true,
                  });
                }}
              />
            </label>
            {!this.state.isWritedTitle && <p className="error">Please enter the title</p>}
          </div>
          <div>
            <label htmlFor="chooseUser">
              <select
                name="user"
                id="chooseUser"
                value={this.state.userForNewTodo}
                onChange={(event) => {
                  this.changeuserForNewTodo(event.target.value);
                }}
              >
                <option value="0">Choose a user</option>
                {users.map(user => {
                  const { id, name } = user;

                  return (
                    <option value={id}>{name}</option>
                  );
                })}
              </select>
            </label>
            {!this.state.isChoosedUser && <p className="error">Please choose a user</p>}
          </div>
        </div>
        <button type="button" onClick={this.addTodo} className="button">Add Todo</button>
        <div>
          <h1>Todos:</h1>
          <TodoList todos={todoToRender} />
        </div>
      </div>
    );
  }
}

export default App;
