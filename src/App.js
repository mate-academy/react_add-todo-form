import React from 'react';
import './App.css';
import users from './api/users';
import todosArr from './components/newTodoArr/newTodoArr';
import TodosList from './components/todosList/TodosList';
import NewTodo from './components/newTodo/newTodo';

class App extends React.Component {
  state = {
    list: todosArr,
  };

  addUser = (title, id) => {
    this.setState((state) => {
      const myTodo = {
        id: Math.random(),
        title,
        userId: id,
        userName: users.find(user => user.id === id).name,
      };

      return {
        list: [...state.list, myTodo],
      };
    });
  }

  render() {
    const { list } = this.state;

    return (

      <div className="App">
        <h1 className="main-header">Static list of todos </h1>
        <NewTodo addUser={this.addUser} />
        <TodosList list={list} />
      </div>

    );
  }
}
export default App;
