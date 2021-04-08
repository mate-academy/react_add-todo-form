import React from 'react';
import './App.scss';
import { TodoForm } from './component/TodoForm/TodoForm';
import { TodoList } from './component/TodoList/TodoList';

import users from './api/users';
import todos from './api/todos';

export class App extends React.Component {
  state = {
    usersList: users.map(people => people),
    todoList: todos.map(todo => ({
      ...todo,
      name: users.find(person => person.id === todo.userId).name,
    })),
  }

  handleChange = (user, title) => {
    const numbers = this.state.todoList.map(todo => todo.id);

    this.setState(state => ({
      ...state.todoList.push({
        userId: state.usersList.find(people => people.name === user).id,
        id: Math.max(...numbers) + 1,
        title,
        completed: false,
        name: user,
      }),
    }));
  }

  render() {
    const {
      usersList,
      todoList,
    } = this.state;

    return (
      <div className="app">
        <h1>Add todo form</h1>
        <TodoForm
          usersList={usersList}
          handleChange={this.handleChange}
          handleError={this.handleError}
        />
        <TodoList todoList={todoList} />
      </div>
    );
  }
}
