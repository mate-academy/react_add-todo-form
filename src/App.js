import React, { Component } from 'react';
import './App.scss';
import todos from './api/todos';
import users from './api/users';
import TodoList from './components/TodoList';
import NewTodo from './components/NewTodo';

const getTodosWithUsers = (todosArr, usersArr) => (
  todosArr.map(({ userId, ...rest }) => ({
    ...rest,
    user: usersArr.find(user => user.id === userId),
  }))
);

class App extends Component {
  state = {
    usersList: [...users],
    todosList: [...todos],
  }

  addTodo = (todo) => {
    this.setState(state => ({
      todosList: [...state.todosList, {
        ...todo,
        id: state.todosList.length + 1,
      }],
    }));
  };

  render = () => {
    const { usersList, todosList } = this.state;

    return (
      <div className="App">
        <h1>Static list of todos</h1>

        <NewTodo
          users={usersList}
          addTodo={this.addTodo}
        />

        <TodoList list={getTodosWithUsers(todosList, usersList)} />
      </div>
    );
  };
}

export default App;
