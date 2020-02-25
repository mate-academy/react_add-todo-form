import React from 'react';
import './App.css';
import todos from './api/todos';
import users from './api/users';
import { TodoList } from './components/TodoList';
import { NewTodo } from './components/NewTodo';

class App extends React.Component {
  state = {
    todosFromServer: todos,
    usersFromServer: users,
    id: 3,
  }

  addNewTodo = (todo) => {
    this.setState(prevState => ({
      todosFromServer: [
        ...prevState.todosFromServer,
        {
          ...todo,
          id: prevState.id,
        },
      ],
      id: prevState.id + 1,
    }));
  }

  render() {
    const { todosFromServer, usersFromServer } = this.state;

    return (
      <div className="App">
        <h1>Add todo form</h1>
        <NewTodo addNewTodo={this.addNewTodo} users={usersFromServer} />
        <TodoList todos={todosFromServer} />
      </div>
    );
  }
}

export default App;
