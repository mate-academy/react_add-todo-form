import React from 'react';
import './App.css';
import { TodoList } from './Components/TodoList/TodoList';
import { FormAddTodo } from './Components/FormAddTodo/FormAddTodo';

import users from './api/users';
import todos from './api/todos';

class App extends React.Component {
  state = {
    listTodos: [...todos],
  }

  getNewListTodos = newTodo => (
    this.setState(state => ({
      listTodos: [
        ...state.listTodos,
        newTodo,
      ],
    }))
  )

  render() {
    const { listTodos } = this.state;

    return (
      <div className="App">
        <FormAddTodo
          getNewListTodos={this.getNewListTodos}
          listTodos={listTodos}
          users={users}
        />
        <p>
          <span>Users: </span>
          {users.length}
        </p>
        <TodoList
          list={listTodos}
          users={users}
        />
      </div>
    );
  }
}

export default App;
