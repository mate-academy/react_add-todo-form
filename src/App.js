import React from 'react';
import './App.css';

import users from './api/users';
import todos from './api/todos';

import { TodoForm } from './components/TodoForm/TodoForm';
import { TodoList } from './components/TodoList/TodoList';

const preparedTodos = todos.map(todo => ({
  ...todo,
  user: users.find(user => user.id === todo.userId),
}));

const preparedUsers = users.map(user => ({
  id: user.id,
  name: user.name,
}));

class App extends React.Component {
  state = {
    todoList: [...preparedTodos],
  }

  addNewTodo = (task, userId) => {
    this.setState(prevState => ({
      todoList: [
        ...prevState.todoList,
        {
          id: prevState.todoList.length + 1,
          user: preparedUsers.find(user => user.id === userId),
          title: task,
        },
      ],
    }));
  }

  render() {
    const { todoList } = this.state;

    return (
      <div className="app">
        <h1 className="app__title">Add todo App</h1>
        <TodoForm
          users={preparedUsers}
          addNewTodo={this.addNewTodo}
          todos={todoList}
        />
        <TodoList todos={todoList} />
      </div>
    );
  }
}

export default App;
