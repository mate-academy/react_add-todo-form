import React from 'react';
import './App.css';
import todos from './api/todos';
import users from './api/users';
import NewTodo from './components/NewTodo';
import TodoList from './components/TodoList';

class App extends React.Component {
  state = {
    todosFromServer: todos,
    usersFromServer: users,
    id: 1,
  }

  addTodo = (todo) => {
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
        <NewTodo addTodo={this.addTodo} users={usersFromServer} />
        <TodoList todos={todosFromServer} />
      </div>
    );
  }
}

export default App;
