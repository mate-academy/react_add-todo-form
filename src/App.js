import React from 'react';
import './App.css';

import users from './api/users';
import { TodoList } from './displayTodo/TodoList';
import { NewTodo } from './newTodo/NewTodo';

class App extends React.Component {
  state={
    list: [],
  }

  setCompleted = (id) => {
    this.setState(prev => ({
      list: prev.list.map((element) => {
        if (element.id === id) {
          return (
            {
              ...element,
              completed: !element.completed,
            }
          );
        }

        return element;
      }),
    }));
  };

  addToList = (id, userId, title, user) => {
    this.setState(prev => ({
      list: [
        ...prev.list,
        {
          title,
          id,
          userId,
          user,
          completed: false,
        },
      ],
    }));
  }

  render() {
    return (
      <div className="App">
        <h1>Static list of todos</h1>
        <p>
          <span>Todos: </span>
          {this.state.list.length}
        </p>

        <p>
          <span>Users: </span>
          {users.length}
        </p>
        <NewTodo
          users={users}
          list={this.state.list}
          addToList={this.addToList}
        />
        <TodoList
          setCompleted={this.setCompleted}
          list={this.state.list}
        />
      </div>
    );
  }
}

export default App;
