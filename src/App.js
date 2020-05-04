import React from 'react';
import './App.css';
import todos from './api/todos';
import users from './api/users';
import NewTodo from './components/NewTodo';
import TodoList from './components/TodoList';

const todosWithUsers = todos.map(todo => ({
  ...todo,
  user: users.find(
    user => user.id === todo.userId,
  ),
}));

class App extends React.Component {
  state = {
    todosFromServer: todosWithUsers,
    id: 1,
  }

  addTodo = (todo, usersFromServer) => {
    this.setState(prevState => ({
      todosFromServer: [
        ...prevState.todosFromServer,
        {
          ...todo,
          id: prevState.id,
          usersFromServer,
        },
      ],
      id: prevState.id + 1,
    }));
  }

  render() {
    const { todosFromServer } = this.state;

    return (
      <div className="App">
        <NewTodo addTodo={this.addTodo} />
        <TodoList todos={todosFromServer} />
      </div>
    );
  }
}

export default App;
