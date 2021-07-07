import React from 'react';
import TodoList from './Components/TodoList/TodoList';
import NewTodo from './Components/NewTodo';
import './App.css';

import users from './api/users';
import todos from './api/todos';

const preparedTodos = todos.map((item) => {
  const todo = { ...item };
  const userInfo = users.find(user => user.id === todo.userId);

  todo.user = {
    id: userInfo.id,
    name: userInfo.name,
  };

  return todo;
});

const preparedUsers = users.map(user => ({
  id: user.id,
  name: user.name,
}));

class App extends React.Component {
  state = {
    todoList: [...preparedTodos],
    todoIdCounter: preparedTodos.length + 1,
  }

  setTodoStatus = (id) => {
    this.setState(state => ({
      todoList: state.todoList.map(todo => (
        (todo.id === id)
          ? {
            ...todo,
            completed: !todo.completed,
          }
          : todo
      )),
    }));
  };

  addNewTodo = (newTodo) => {
    const { userId, title, completed } = newTodo;

    this.setState(state => ({
      todoList: [
        ...state.todoList,
        {
          userId: +userId,
          id: state.todoIdCounter,
          title,
          completed,
          user: {
            id: +userId,
            name: users.find(user => user.id === +userId).name,
          },
        },
      ],
      todoIdCounter: state.todoIdCounter + 1,
    }));
  }

  deleteTodo = (id) => {
    this.setState(state => ({
      todoList: [...state.todoList].filter(todo => todo.id !== id),
    }));
  }

  render() {
    const { todoList } = this.state;

    return (
      <div className="app">
        <h1>Add todo form</h1>
        <NewTodo users={preparedUsers} addNewTodo={this.addNewTodo} />
        <p>
          <span>Users: </span>
          {users.length}
        </p>
        <TodoList
          todoList={todoList}
          setTodoStatus={this.setTodoStatus}
          deleteTodo={this.deleteTodo}
        />
      </div>
    );
  }
}

export default App;
