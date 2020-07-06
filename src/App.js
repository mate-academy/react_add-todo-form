import React from 'react';
import './App.css';
import { NewTodo } from './components/NewTodo/NewTodo';
import { TodoList } from './components/TodoList/TodoList';

import { users as usersFromServer } from './api/users';

const newTodosList = [];

const todosList = (todos) => {
  const getUserById = userId => usersFromServer
    .find(user => user.id === userId);

  return todos.map(list => ({
    ...list,
    user: getUserById(list.userId),
  }));
};

class App extends React.Component {
  state = {
    todos: todosList(newTodosList),
    page: 0,
  }

  addTodo = (todo) => {
    this.setState(prevState => ({
      todos: [...prevState.todos, todo],
    }));
  }

  backgroundChanger = () => {
    const colors = [
      '#ff7585',
      '#ffa985',
      '#fffcb0',
      '#84e87b',
      '#83c9f2',
      '#8a94eb',
      '#bf97de',
    ];
    const randomColor = colors.sort(() => Math.random() - 0.5);

    this.setState({
      page: randomColor[0],
    });

    return this.state.page;
  }

  render() {
    const { todos } = this.state;

    return (
      <div className="page" style={{ backgroundColor: this.state.page }}>
        <div className="app__container">
          <h1 className="app__title">Add todo app</h1>
          <NewTodo
            users={usersFromServer}
            todos={todos}
            addTodo={this.addTodo}
            backgroundChanger={this.backgroundChanger}
          />
          <br />
          <TodoList todos={todos} />
        </div>
      </div>
    );
  }
}

export default App;
