import React from 'react';
import './App.css';

import todos from './api/todos';
import users from './api/users';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';

const todoFromServer = todos.map(todoList => ({
  ...todoList,
  user: users.find(userList => userList.id === todoList.userId),
}));

class App extends React.PureComponent {
  state = {
    todoList: todoFromServer,
  }

  addTodo = (newTodo) => {
    this.setState(prevState => ({
      todoList: [...prevState.todoList, newTodo],
    }));
  }

  render() {
    const { todoList } = this.state;

    return (
      <div className="App">
        <TodoForm userList={users} addTodo={this.addTodo} />
        <TodoList todoList={todoList} />
      </div>
    );
  }
}

export default App;
