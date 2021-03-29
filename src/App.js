import React from 'react';

import todos from './api/todos';
import users from './api/users';

import { Form } from './components/Form/Form';
import { TodoList } from './components/ToDoList/ToDoList';

import './App.scss';

const preparedTodos = [...todos].map(todo => ({
  ...todo,
  user: users.find(user => user.id === todo.userId),
}));

class App extends React.Component {
  state={
    toDoList: preparedTodos,
  }

  addTodo = (todo) => {
    this.setState(state => ({
      toDoList: [...state.toDoList, todo],
    }));
  };

  render() {
    const { toDoList } = this.state;

    return (
      <div className="App">
        <h1 className="App__header">List of todos</h1>
        <p>
          <span className="App__info">Todos: </span>
          {toDoList.length}
        </p>

        <p>
          <span className="App__info">Users: </span>
          {users.length}
        </p>

        <Form
          toDoList={toDoList}
          onAdd={this.addTodo}
        />
        <TodoList todos={toDoList} />
      </div>
    );
  }
}

export default App;
