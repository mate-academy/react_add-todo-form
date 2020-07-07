import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './App.css';
import users from './api/users';
import todos from './api/todos';
import { TodoList } from './Components/TodoList/TodoList';
import { getNames } from './utilities/getNames';
import { AddNewTodo } from './Components/AddNewTodo/AddNewTodo';
import { TodoShape } from './shapes/Shapes';

const names = getNames(users);

export class App extends Component {
  state = {
    todosFromServer: todos,
  }

  addTodoHandler = (newTodo) => {
    this.setState(prevState => ({
      todosFromServer: [...prevState.todosFromServer,
        {
          ...newTodo, id: prevState.todosFromServer.length + 1,
        }],
    }));
  }

  render() {
    const { todosFromServer } = this.state;

    return (
      <div className="App">
        <AddNewTodo
          names={names}
          addTodo={this.addTodoHandler}
        />
        <TodoList
          list={todosFromServer}
        />
      </div>
    );
  }
}

App.propTypes = PropTypes.arrayOf(TodoShape).isRequired;
