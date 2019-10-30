import React from 'react';
import './App.css';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import TodoList from './components/todoList/TodoList';
import NewTodo from './components/newTodo/NewTodo';

class App extends React.PureComponent {
  state = {
    todosWithUser: this.getTodosWithUser(todosFromServer, usersFromServer),
  }

  getTodosWithUser(todos, users) {
    return todos.map(todo => ({
      ...todo,
      user: users.find(user => user.id === todo.userId),
    }));
  }

  newTodoSubmit = (todoTitle, userName) => {
    this.setState((prevState) => {
      const newTodo = {
        id: prevState.todosWithUser.length + 1,
        title: todoTitle,
        completed: false,
        user: usersFromServer.find(user => user.name === userName),
      };
      console.log(userName);
      return ({
        ...prevState,
        todosWithUser: [...prevState.todosWithUser, newTodo],
      });
    });
  };

  render() {
    return (
      <div className="App">
        <NewTodo users={usersFromServer} submitFunction={this.newTodoSubmit} />
        <TodoList todosWithUser={this.state.todosWithUser} />
      </div>
    );
  }
}

export default App;
