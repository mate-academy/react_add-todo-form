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
    errorTitle: false,
    errorUser: false,
  }

  handleChange = (human, title) => {
    if (!title && !human) {
      this.setState({
        errorTitle: true,
        errorUser: true,
      });

      return;
    }

    if (!title || title.length < 10) {
      this.setState({ errorTitle: true });

      return;
    }

    if (!human) {
      this.setState({ errorUser: true });

      return;
    }

    this.setState(state => ({
      ...state.todoList.push({
        userId: state.usersList.find(people => people.name === human).id,
        id: state.todoList.length + 1,
        title,
        completed: false,
        name: human,
      }),
      errorTitle: false,
      errorUser: false,
    }));
  }

  render() {
    const {
      usersList,
      todoList,
      errorTitle,
      errorUser,
    } = this.state;

    return (
      <div className="app">
        <h1>Add todo form</h1>
        <TodoForm
          usersList={usersList}
          handleChange={this.handleChange}
        />
        <section className="app__error-inner">
          {errorTitle
          && (
          <span
            className="app__error-title"
          >
            Please enter the title (at least 10 characters)
          </span>
          )
        }
          {errorUser
          && (
          <span className="app__error-user">
            Please choose a user
          </span>
          )}
        </section>
        <TodoList todoList={todoList} />
      </div>
    );
  }
}
