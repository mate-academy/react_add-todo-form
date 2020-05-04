import React from 'react';
import './App.css';
import NewToDo from './components/NewToDo';
import todosFromServer from './api/todos';
import users from './api/users';
import TodoList from './components/TodoList';

class App extends React.Component {
  initialTodos = todosFromServer.map((item) => {
    const { id, title, completed } = item;

    return {
      ...{
        id, title, completed,
      },
      userName: users.find(user => (user.id === item.userId)).name,
    };
  })

  state = {
    todos: this.initialTodos,
    usersNames: [...users.map(user => user.name)].sort(),
  }

  addToDoFunction = (toDoFromForm) => {
    this.setState(prevState => ({
      todos: [...prevState.todos, {
        id: prevState.todos.length + 1,
        ...toDoFromForm,
      }],
      usersNames: [
        ...(new Set([
          ...prevState.usersNames,
          toDoFromForm.userName,
        ])),
      ].sort(),
    }));
  }

  render() {
    const { todos, usersNames } = this.state;

    return (
      <div className="App">
        <h1>Static list of todos</h1>
        <p>
          <span>Todos: </span>
          {todos.length}
        </p>
        <TodoList preparedTodos={todos} />
        <NewToDo
          addToDoFunction={this.addToDoFunction}
          todos={todos}
          usersNames={usersNames}
        />

        <p>
          <span>Users: </span>
          {users.length}
        </p>
      </div>
    );
  }
}

export default App;
