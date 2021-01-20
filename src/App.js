import React from 'react';
import './App.scss';
import TodoList from './components/TodoList';

import todos from './api/todos';
import users from './api/users';

const preparedTodos = todos
  .map(todo => ({
    ...todo,
    user: users.find(user => user.id === todo.userId),
  }));

class App extends React.Component {
  state = {
    visibleTodos: preparedTodos,
  }

  addTodo = () => {
    const newTodo = {
      title: 'title',
      id: 'random',
      userId: this.user.id,
      user: {
        id: 'from preparedTodos',
      },
    };

    this.setState(state => ({
      visibleTodos: [
        newTodo,
        ...state.visibleTodos,
      ],
    }
    ));
  }

  render() {
    return (
      <div className="App">
        <h1>ToDo</h1>
        <p>
          <span>Tasks: </span>
          {todos.length}
        </p>

        <p>
          <span>Users: </span>
          {users.length}
        </p>
        <div className="add_todo">
          <h3>Add new task</h3>
          <form action="post">
            <input type="text" />
            <select name="user" id="">
              <option value="value1">User 1</option>
              <option value="value2" selected>User 2</option>
              <option value="value3">User 3</option>
            </select>
            <button type="button" onClick={this.addTodo}>Add</button>
          </form>
        </div>
        <TodoList todos={this.state.visibleTodos} />
      </div>
    );
  }
}

export default App;
