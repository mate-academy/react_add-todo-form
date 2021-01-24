import React from 'react';
import './App.css';

import todos from './api/todos';
import users from './api/users';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';

const todoFromServer = todos.map(todoList => ({
  ...todoList,
  user: users.find(userList => userList.id === todoList.id),
}));

class App extends React.PureComponent {
  state = {
    todoList: todoFromServer,
    userList: users,
  }

  addTodo = (el) => {
    this.setState(prevState => ({
      todoList: [...prevState.todoList, el],
    }));
  }

  render() {
    const { todoList, userList } = this.state;

    return (
      <div className="App">
        <TodoForm userList={userList} addTodo={this.addTodo} />
        <TodoList todoList={todoList} />
      </div>
    );
  }
}

export default App;
